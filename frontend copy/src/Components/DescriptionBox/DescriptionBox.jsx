import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className='descriptionbox-navigator'>
                <div className='descriptionbox-nav-box'>Description</div>
                <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
            </div>
            <div className="descriptionbox-discription">
                <p>
                    A product description is a salesy text, usually not longer than 100 words, that describes your product’s best features with the goal to sell the product. Essentially, a product description is one of the important parts right after visuals that helps shoppers make a decision on whether to buy a product or not.
                </p>
                <p>
                    Let’s think about how we shop for products in retail stores. First, we eye a product, then we want to touch it, we want to feel the quality, the fabric, and all the details. We want to see everything close up.
                </p>
            </div>

        </div>
    )
}

export default DescriptionBox