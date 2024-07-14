import React from 'react'
import './Hero.css'
import porsche1 from '../Assets/porsche.png'

import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-left'>
                <h1 className='left-heading'> WELCOME <br />
                    TO THE WORLD <br /> OF
                    <h1 className="posters">&nbsp; POSTER'S </h1></h1>
                <p>Introducing Galaxy Posters - The Ultimate Marketplace Tool! Get ready to revolutionize the way you
                    shop with Galaxy Posters, the all-in-one marketplace tool that makes online shopping easier than
                    ever before.</p>
                {/* <button className='collections-button'><Link style={{ textDecoration: 'none', color: 'black' }} to='/OurCollections'>Our Collections</Link></button> */}
            </div>

            <div className='hero-right'>
                <img src={porsche1} alt="" />

            </div>

        </div>
    )
}

export default Hero