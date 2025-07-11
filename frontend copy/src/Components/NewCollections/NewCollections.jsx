import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'

const NewCollections = () => {

  const [New_collection, setNew_collection] = useState([]);


  useEffect(() => {
    fetch('https://e-comm-backend-wvjk.onrender.com/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  },[])


  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className='collections'>
        {New_collection.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections
