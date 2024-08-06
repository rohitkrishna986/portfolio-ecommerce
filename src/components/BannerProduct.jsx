import React, { useEffect, useState } from 'react'

import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImage = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileImage = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        if(desktopImage.length-1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }
    const previousImage = () => {
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=> {
            if(desktopImage.length-1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        },3000)
        return ()=> clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded-md'>
        <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={previousImage} className='bg-white opacity-50 shadow-md rounded-full p-1'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='bg-white opacity-50 shadow-md rounded-full p-1'><FaAngleRight/></button>
                </div>
            </div>
            
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImage.map((imageURL, index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURL} className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImage.map((imageURL, index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURL} className='w-full h-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct