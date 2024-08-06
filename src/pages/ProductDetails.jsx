import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import summaryApi from '../common/index.js'
import displayINR from '../helper/displayCurrency.jsx'
import RecommendedProduct from '../components/RecommendedProduct.jsx'
import addToCart from '../helper/addToCart.jsx'
import Context from '../context/index.jsx'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    selling : ""
  })

  const params = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const imageListLoading = new Array(4).fill(null)
  const[activeImage, setActiveImage] = useState("")
  const {fetchUserAddToCart} = useContext(Context)

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(summaryApi.productDetails.url,{
      method : summaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data.productImage[0])
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleAddToCart = async(e,id) => {
    await addToCart(e,id);
    fetchUserAddToCart();
  }

  const handleAddToBuy = async(e,id) => {
    await addToCart(e,id);
    fetchUserAddToCart();
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product image */} 
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply'/>
          </div>
          <div className='h-full'>
            {
              loading ? (

                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    imageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>
    
                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage.map((productImage, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                          <img src={productImage} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(productImage)} onClick={()=>handleMouseEnterProduct(productImage)}/>
                        </div>
                      )
                    })
                  }
                </div>

              )
            }
          </div>
        </div>

        {/* product details */}
        {
          loading ? (
            <div className='flex flex-col gap-2 p-1 w-full'>
              <p className=' px-2 rounded-full inline-block w-fit bg-slate-200 p-1 h-full'></p>
              <h2 className='text-2xl lg:text-4xl font-semibold bg-slate-200 p-1 h-full'></h2>
              <p className='capitalize text-slate-400 p-1 bg-slate-200 h-full'></p>

              <div className='flex items-center gap-2 my-2 text-2xl lg:text-3xl font-medium w-full'>
                <p className=' p-1 bg-slate-200 h-full'></p>
                <p className=' line-through p-1 bg-slate-200 h-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='border-2  rounded-full px-3 font-medium py-1 min-w-[100px] bg-slate-200 h-full'></button>
                <button className='border-2  font-medium text-white px-3 py-1 min-w-[100px] bg-slate-200 h-full'></button>
              </div>

              <div>
                <p className=' font-medium my-1 p-1 w-full bg-slate-200 h-full'></p>
                <p></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <p className='bg-red-200 text-red-500 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-semibold'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data.category}</p>

              <div className='flex items-center gap-2 my-2 text-2xl lg:text-3xl font-medium'>
                <p className='text-red-600'>{displayINR(data?.selling)}</p>
                <p className='text-slate-400 line-through'>{displayINR(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded-full text-red-600 hover:text-white hover:bg-red-600 px-3 font-medium py-1 min-w-[100px]' onClick={(e)=> handleAddToBuy(e,data._id)}>Buy</button>
                <button className='border-2 bg-red-600 rounded-full hover:border-red-600 hover:bg-transparent hover:text-red-600 font-medium text-white px-3 py-1 min-w-[100px]' onClick={(e)=> handleAddToCart(e,data._id)}>Add To Cart</button>
              </div>

              <div>
                <p className='to-slate-600 font-medium my-1'>Description : </p>
                <p>{data?.description}</p>
              </div>
          </div>
          )
        }
      </div>

      {
        data.category && (
          <RecommendedProduct heading={"Recommended Products"} category={data.category}/>
        )
      }
    </div>
  )
}

export default ProductDetails