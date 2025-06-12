import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'
const Popular = () => {

    const [popularProducts, setPopularProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/popularincars')
            .then((response) => response.json())
            .then((data) => setPopularProducts(data));
            
    }, [])

console.log(popularProducts)
    return (
        <>
            <div className='popular'>
                <h1>POPULAR IN CARS</h1>
                <hr />
                <div className='popular-items'>
                    {popularProducts.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>
            </div>
            {/* <div style={{width: '100%', height: '1px',background: 'gray' }}></div> */}
        </>

    )
}

export default Popular