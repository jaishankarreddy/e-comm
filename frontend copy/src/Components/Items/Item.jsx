import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <div className='item'>
            <div className='img-container'>
           <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} className='img' src={props.image} alt="" /></Link> 
            </div>
            <p>{props.name}</p>
            <div className='item-prices'>
                <div className='item-price-new'><span>Rs. </span>
                    {props.new_price}
                </div>
                <div className='item-price-old'><span>Rs. </span>
                    {props.old_price}
                </div>
            </div>
        </div>
    )
}

export default Item