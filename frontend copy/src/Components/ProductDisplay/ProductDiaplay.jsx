import React, { useContext } from 'react'
import "./ProductDiaplay.css"
import star_rating from '../Assets/star_rating.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDiaplay = (props) => {
    const { product } = props;
const{addToCart} = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img className='stars' src={star_rating} alt="" />
                    <p>(122)</p>

                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old"><span>Rs. </span>{product.old_price}</div>
                    <div className="productdisplay-right-prices-new"><span>Rs. </span>{product.new_price}</div>
                </div>

                <div className="productdisplay-right-disprition">
                    Product descriptions can make or break a sale. In this video, well talk about the importance of a good product description,  and show you how you can adjust the default Printful descriptions to fit the needs of your business and make more sales.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>A1</div>
                        <div>A2</div>
                        <div>A3</div>
                        <div>A4</div>
                    </div>
                </div>
                <button className='add-button' onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>Posters, Art, Pictures, Painting</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDiaplay