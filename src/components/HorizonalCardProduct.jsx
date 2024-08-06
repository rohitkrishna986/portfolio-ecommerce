import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWishProduct'
import displayINR from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'

const HorizonalCardProduct = ({
    category, heading
}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e, id ) => {
      await addToCart(e, id)
      fetchUserAddToCart();
    }

    const scrollElement = useRef();

    const fetchData =async() => {
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)
      setData(categoryProduct?.data)

    }
    useEffect(()=> {
      fetchData();
    },[])

    const scrollRight = () => {
      scrollElement.current.scrollLeft += 500
    }

    const scrollLeft = () => {
      scrollElement.current.scrollLeft -= 500
    }



  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white shadow-md rounded-full hidden md:block p-1 absolute left-0 text-lg' onClick={scrollLeft}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full hidden md:block p-1 absolute right-0 text-lg' onClick={scrollRight}><FaAngleRight/></button>
        { loading? (
          loadingList?.map((product, index) => {
            return (
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' key={index}>
                <div className='bg-slate-200 p-4 h-full min-w-[120px] md:min-w-[145px] animate-pulse'>
                </div>
                <div className='p-4 grid'>
                  <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-white'></h2>
                  <p className='capitalize text-slate-500 p-1 bg-white'></p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium p-1 bg-white'></p>
                    <p className='text-slate-500 p-1 line-through bg-white'></p>
                  </div>
                  <button className='text-sm text-white px-3 py-1 rounded-full w-full bg-white'></button>
                </div>
              </div>
            )
          })
        ) : (
          data?.map((product, index) => {
            return (
              <Link to={'product/'+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' key={index}>
                <div className='bg-slate-200 p-4 h-full min-w-[120px] md:min-w-[145px] '>
                  <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer'/>
                </div>
                <div className='p-4 grid'>
                  <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1'>{product?.productName}</h2>
                  <p className='capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium'>{displayINR(product?.selling)}</p>
                    <p className='text-slate-500 line-through'>{displayINR(product?.price)}</p>
                  </div>
                  <button className='bg-red-500 hover:bg-red-600 text-sm text-white px-3 py-1 rounded-full' onClick={(e)=> handleAddToCart(e,product?._id)}>Add to cart</button>
                </div>
              </Link>
            )
          })
        )
        }
        </div>
        
    </div>
  )
}

export default HorizonalCardProduct