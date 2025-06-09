import React from 'react'
import { assets } from '../assets/assets'

const BottomBanner = () => {
    return (
        <div className='relative mt-24'>
            <img className="w-full hidden md:block" src={assets.bottom_banner_image} alt="bottom_banner" />
            <img className='w-full block md:hidden' src={assets.bottom_banner_image_sm} alt="bottom_banner" />
        </div>
    )
}

export default BottomBanner
