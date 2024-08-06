import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts.jsx'
import summaryApi from '../common/index.js'
import AdminProductCard from '../components/AdminProductCard.jsx'

const AllProducts = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllproducts = async()=> {
    const response = await fetch(summaryApi.getAllProduct.url)
    const dataResponse = await response.json()
    setAllProducts(dataResponse.data || [])
  }
  useEffect(()=> {
    fetchAllproducts()
  },[])
  return ( 
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-semibold text-lg '>All Products</h2>
        <button onClick={()=> setShowMenu(true)} className='bg-white border-2 border-red-500 hover:text-white hover:bg-red-600 text-red-600 px-3 py-1 rounded-full'>Upload</button>
      </div>
      <div className='flex items-center flex-wrap gap-4 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {allProducts.map((product,index) => {
          return (
            <AdminProductCard fetchData={fetchAllproducts} data={product} key={index+"allProducts"}/>
          )
        })}
      </div>

      {
        showMenu && (
          <UploadProducts fetchData={fetchAllproducts} onClose={()=>setShowMenu(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts