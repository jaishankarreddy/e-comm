import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/addproduct.png'
import list_product from '../../assets/list_product.png'

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="" className='add_products' />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={list_product} alt="" className='list_products'/>
                    <p>List Product</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar