import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common/index.js'
import Context from '../context/index.jsx'
import displayINR from '../helper/displayCurrency.jsx'
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const[data, setData] = useState([])
  const[loading, setLoading] = useState(false) 

  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const fetchData = async() => {
    // setLoading(true)
    const dataResponse = await fetch(summaryApi.addToCartView.url,{
      method : summaryApi.addToCartView.method,
      credentials :"include"
    })
    // setLoading(false)
    const dataApi = await dataResponse.json()

    if(dataApi.success) {
      setData(dataApi.data)
    }
    if(dataApi.error) {
      toast.error(data.message)
    }

  }

  const handleLoading = async() => {
    
  }
  useEffect (()=> {
    fetchData();
  },[])

  const increaseQty = async(id,qty) => {
    const response = await fetch(summaryApi.updateAddToCart.url,{
      method : summaryApi.updateAddToCart.method,
      credentials : "include",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        _id : id,
        quantity : qty + 1
      })
    })
     const responseData = await response.json()

     if(responseData.success) {
      fetchData();
    }
  }

  const decreaseQty = async(id,qty) => {
    if(qty >= 2) {
      const response = await fetch(summaryApi.updateAddToCart.url,{
        method : summaryApi.updateAddToCart.method,
        credentials : "include",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          _id : id,
          quantity : qty - 1
        })
      })
       const responseData = await response.json()
  
       if(responseData.success) {
        fetchData();
      }
    }
  }

  const deleteCartProduct = async(id) => {
    const response = await fetch(summaryApi.deleteAddToCart.url,{
      method : summaryApi.deleteAddToCart.method,
      credentials : "include",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        _id : id
      })
    })
     const responseData = await response.json()

     if(responseData.success) {
      fetchData();
      Context.fetchUserAddToCart();
    }
  }

  const totalQty = data.reduce((previousValue, currentValue) => previousValue+ currentValue.quantity, 0)

  const totalPrice = data.reduce((prev,curr)=> prev + (curr.quantity * curr?.productId?.selling),0)

  return (
    <div className='container mx-auto px-6'>
      <div className='text-center text-lg my-3'>
        {
          data?.length === 0 && !loading && (
            <p className='bg-white py-5'>No Items Available</p>
          )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        <div className='w-full max-w-4xl'>
            {
              loading ? (
                loadingCart.map((el,index) => {
                  return(
                    <div key={el+"Cart Loading"+index} className='w-full bg-slate-200 h-32 my-1 border-slate-300 animate-pulse rounded'></div>
                  )
                })
              ) : (
                  data?.map((product, index)=> {
                    return (
                      <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                        <div className='w-32 h-32 bg-slate-200'>
                          <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                        </div>
                        <div className='px-4 py-2 relative'>
                          <div onClick={()=> deleteCartProduct(product?._id)} className='absolute text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer right-0'>
                            <MdDelete/>
                          </div>
                          <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                          <p className='capitalize to-slate-400'>{product?.productId?.category}</p>
                          <div className='flex items-center justify-between'>
                            <p className='text-red-600 font-medium text-lg'>{displayINR(product?.productId?.selling)}</p>
                            <p className='text-slate-600 font-semibold text-lg'>{displayINR(product?.productId?.selling * product?.quantity)}</p>
                          </div>
                          <div className='flex items-center gap-3 mt-1'>
                            <button onClick={()=> decreaseQty(product?._id, product?.quantity)} className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded-md hover:bg-red-600 hover:text-white'>-</button>
                            <span>{product?.quantity}</span>
                            <button onClick={()=> increaseQty(product?._id, product?.quantity)} className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded-md hover:bg-red-600 hover:text-white'>+</button>
                          </div>
                        </div>
                      </div>
                    )
                  })
              )
            }
        </div>
        <div className='mt-5 lg:mt-0 w-full max-w-md '>
          {
            loading ? ( 
              <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
              </div>
            ) : (
              <div className='h-36 bg-white'>
                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Total Price</p>
                  <p>{displayINR(totalPrice)}</p>
                </div>
                <button className='bg-blue-600 p-2 text-white w-full rounded-md mt-4'>Payment</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart