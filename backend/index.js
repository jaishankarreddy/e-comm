// node index.js

const port = 4000;
const express = require("express");
const app = express();                 //creating app using express
const mongoose = require("mongoose");  //database 
const jwt = require("jsonwebtoken");   //to generate tokens 
const multer = require("multer");      //(Image storage system) Multer is a Node.js middleware which is mainly used for uploading files.
const path = require("path");
const cors = require("cors");           //provide access to react project

app.use(express.json());
app.use(cors()); //used to connect react front end and backend

//Connection with MongoDB
mongoose.connect("mongodb+srv://jaishankardev:jaishankardev@cluster0.oik6chy.mongodb.net/e-commerce")


// API checking 
app.get("/", (req, res) => {
    res.send("express app is running")
})

//Image storage Engine(rename the image with the new name when it is uploaded and will be stored in images folder)
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//function to upload using multer
const upload = multer({ storage: storage })


//.....................endpoint for image upload.......................
//creating upload endpoint for images(image will be uploads in this end point using post method)
app.use('/images', express.static(path.join(__dirname, 'upload/images')));
// uploading images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});



// creating schema for mongodb to store data
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})



//getting informationn using request
//.....................endpoint for add products.........................
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        // geting product
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);

    // save product in db
    await product.save();
    console.log("saved");

    // response for frontend
    res.json({
        success: true,
        name: req.body.name,
    })
})


//................API Endpoint to remove products..................
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})



//........................creating API for getting all product.......................
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})





//................... schema creating for user information.......................
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },

})



// ..................Creating Endpoint for registering the user...................
app.post('/signup', async (req, res) => {
    //checking whether user exist or not
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email id " })
    }
    //if new user found then create empty cart for them
    let cart = {};
    for
        (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    //saving user into database
    await user.save();
    //creating the token suing data object
    const data = {
        user: {
            id: user.id
        }
    }
    // generating token for each user using jwt.sign method
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})



// .................creating end point for user login.....................
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, error: "Wrong password" });
        }
    }
    else {
        res.json({ success: false, error: "Wrong email Id" });
    }
})



//.....................creating endpoint for popular in cars section .................
app.get('/popularincars', async (req, res) => {
    let products = await Product.find({ category: "cars" });
    let popular_in_cars = products.slice(0, 4);
    console.log("Popular in cars fetched");
    res.send(popular_in_cars);
    console.log(res)
})



//.............creating middelware to fetch users(used to convert token to userId).............
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}




// ................creating endpoint for adding products in cartdata................
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})




//..............creating endpoint for remove products in cartdata...............
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")

})




// .............creating endpoint to get cartdata............
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})




//.............. Creating endpoint for newcollection data...............
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})





app.listen(port, (error) => {
    if (!error) {
        console.log("server running on port " + port);
    }
    else {
        console.log("Error :" + error);
    }
})