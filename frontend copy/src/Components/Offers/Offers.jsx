import React from 'react'
import './Offers.css'
 
import offer1 from '../Assets/offers-img/offer1.png' 
import offer2 from '../Assets/offers-img/offer2.png'
import offer3 from '../Assets/offers-img/offer3.png' 
import offer4 from '../Assets/offers-img/offer4.png' 
import offer5 from '../Assets/offers-img/offer5.png' 
import offer6 from '../Assets/offers-img/offer6.png' 

const Offers = () => {
    return (
        <div className='offers'>
            <div className='offers-left'>
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button> Chect Now</button>
            </div>
            <div className='offers-right'>
                <img className='special-offer-sticker' src={offer2} alt="" />
                {/* <img  style={{width:'10rem', }} src={offer3} alt="" /> */}
                {/* <img style={{width:'25rem', }} src={offer5} alt="" /> */}
            </div>
        </div>
    )
}

export default Offers