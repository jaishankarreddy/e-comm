import React from 'react'
import './Home_bottom.css'
import one from '../Assets/fast_delivery2.png'
import two from '../Assets/secure_payment1.png'
import three from '../Assets/easy_return1.jpeg'

const Home_bottom = () => {
    return (

        <div className='hero2'>

            <p className='welcome'>WE CARE FOR YOU</p>

            <p className='heroDescription'> The poster brand that's setting a new standard. Products to help
                you feel good and motivated. </p>


            <div className='heroPicHold'>
                <img  src={one} className="img1" />
                <img src={two} className=" " />
                <img src={three} className="" />
            </div>

            <div className='heroHeadingHold'>
                <p> Fastest Delivery </p>
                <p> Secured Payments </p>
                <p> Easy Returns </p>
            </div>

            <div className='heroDescHold '>
                <p> Aliquam venenatis vel lorem id  nuaer mollis eget. </p>
                <p> Nulla tincidunt gravida augue, eget pellentesque. </p>
                <p> Aliquam sed diam fringilla, loborti sorci nec </p>
            </div>
        </div>
    )
}

export default Home_bottom