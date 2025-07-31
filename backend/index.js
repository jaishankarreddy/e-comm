require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const Product = require("./models/products");
const Users = require("./models/users");

const app = express();
const port = process.env.PORT || 4000;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health check
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://${req.headers.host}/images/${req.file.filename}`,
    //EX:  http://localhost:4000/images/filename.jpg
  });
});

// Add Product Endpoint
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();
  res.json({ success: true, name: req.body.name });
});

// Remove Product Endpoint
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Fetch All Products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// Signup Endpoint
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email id",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, jwtSecret);
  res.json({ success: true, token });
});

// Login Endpoint
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    const token = jwt.sign({ user: { id: user.id } }, jwtSecret);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, error: "Invalid credentials" });
  }
});

// Middleware to verify token
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Cart APIs
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Popular in Cars
app.get("/popularincars", async (req, res) => {
  let products = await Product.find({ category: "cars" });
  res.send(products.slice(0, 4));
});

// New Collection
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  res.send(products.slice(-8));
});

// Start server
app.listen(port, () => {
  console.log("Server running on port", port);
});
