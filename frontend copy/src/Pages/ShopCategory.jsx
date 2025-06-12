import React, { useContext } from 'react'
import './css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown from '../Components/Assets/down-arrow.png'
import Item from '../Components/Items/Item'


const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className='shopcategory'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p className='span'>
          <span>Showing 1-12 out of 15 products</span>
        </p>
        <div className="shopcategory-sort">
          <p>Sort by</p>
          <img src={dropdown} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item className='item' key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}

      </div>

    </div>
  )
}

export default ShopCategory;