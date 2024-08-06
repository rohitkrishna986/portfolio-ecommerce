import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop.jsx'
import displayINR from '../helper/displayCurrency.jsx'
import Context from '../context/index.jsx'
import addToCart from '../helper/addToCart.jsx'
import { Link } from 'react-router-dom'

const SearchProductcard = ({loading, data}) => {

    const loadingList = new Array(13).fill(null)

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e, id ) => {
      await addToCart(e, id)
      fetchUserAddToCart();
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] md:gap-6 px-4 justify-center md:justify-between transition-all gap-4'>
        { loading ? (
            loadingList?.map((product, index) => {
                return (
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow ' key={index}>
                    <div className='bg-slate-200 p-4 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-white'></h2>
                        <p className='capitalize text-slate-500 bg-white'></p>
                        <div className='flex gap-3'>
                        <p className='text-red-600 font-medium bg-white'></p>
                        <p className='text-slate-500 line-through bg-white'></p>
                        </div>
                        <button className='text-sm text-white px-3 py-1 rounded-full bg-white'></button>
                    </div>
                    </div>
                )
                })
        ) : (
            data?.map((product, index) => {
                return (
                    <Link to={"/product/"+product?._id} onClick={scrollTop} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow ' key={index}>
                    <div className='bg-slate-200 p-4 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply'/>
                    </div>
                    <div className='p-4 grid gap-3'>
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
  )
}

export default SearchProductcard