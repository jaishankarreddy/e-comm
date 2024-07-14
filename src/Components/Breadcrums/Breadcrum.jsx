import React from 'react'
import './Breadcrum.css'
import arrow_next from '../Assets/next.png'

const Breadcrum = (props) => {
    const { product } = props;

    return (
        <div className='Breadcrum'>
            HOME <img src={arrow_next} alt="" /> SHOP <img src={arrow_next} alt="" /> {product.category} < img src={arrow_next} alt="" />  {product.name}
        </div>

    )
}

export default Breadcrum;