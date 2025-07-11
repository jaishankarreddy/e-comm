import React, { useEffect, useState } from 'react'
import './ListProduct.css';
import remove_icon from '../../assets/remove2.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch('https://e-comm-backend-wvjk.onrender.com/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }
  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async (id) => {
    await fetch('https://e-comm-backend-wvjk.onrender.com/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
  }
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>

            <div key={index} className="listproduct-format-main listproduct-format">
              <img className='listproduct-product-icon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => { remove_product(product.id) }} src={remove_icon} alt="" className='remove-icon' />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
