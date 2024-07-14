import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Home_bottom from '../Components/Home-bottom/Home_bottom'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Home_bottom/>
      <Popular/> 
      <Offers/>
      <NewCollections/>
  
    </div>
  )
}

export default Shop;