import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import productCategory from '../helper/productCategory.jsx'
import { IoCloudUpload } from "react-icons/io5";
import uploadImage from '../helper/uploadImage.jsx';
import DisplayImage from './DisplayImage.jsx';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common/index.js';
import {toast} from 'react-toastify';

const AdminEditProduct = ({onClose , ProductData, fetchData}) => {
    const[data, setData] = useState({
      ...ProductData,
      productName : ProductData?.productName,
      brandName : ProductData?.brandName,
      category : ProductData?.category,
      productImage : ProductData?.productImage || [],
      description : ProductData?.description,
      price : ProductData?.price,
      selling : ProductData?.selling
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const[fullScreenImage, setFullScreenImage] = useState("")
    const handleUploadProduct = async(e) => {
      const file = e.target.files[0]
      const uploadCloundinary = await uploadImage(file)
      setData((prev)=>{
        return {
          ...prev,
          productImage : [ ...prev.productImage, uploadCloundinary.url]
        }
      })
    }
    const handleDeleteProduct = async(index) => {
      const newProductimage = [...data.productImage]
      newProductimage.splice(index,1)
      setData((prev)=>{
        return {
          ...prev,
          productImage : [...newProductimage]
        }
      })
    }
  
    const handleOnChange =(e)=> {
      const {name, value} = e.target
      setData((prev)=>{
        return {
          ...prev,
          [name] : value
        }
      })
    }
  
    const handleSumbitProduct = async(e) => {
      e.preventDefault();
      const response = await fetch(summaryApi.updateProduct.url, {
        method : summaryApi.updateProduct.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const responseData = await response.json()
  
      if(responseData.success) {
        toast.success(responseData?.message)
        onClose();
        fetchData()
      }
      if(responseData.error){
        toast.error(responseData?.message)
      }
  
    }
  return (
    <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-semibold text-lg'>Update Product</h2>
          <div>
            <button onClick={onClose} className='block ml-auto text-red-600 text-xl'><IoClose/></button>
          </div>
        </div>

        <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSumbitProduct}>
          <label htmlFor='productName'>Product Name : </label>
          <input 
            name='productName'
            type='text' 
            id='productName' 
            placeholder='Enter product name' 
            value={data.productName} 
            onChange={handleOnChange}
            required
            className='p-2 bg-slate-100 border rounded-md'/>
          <label className='mt-3' htmlFor='brandName'>Brand Name : </label>
          <input 
            name='brandName'
            type='text' 
            id='brandName' 
            placeholder='Enter brand name' 
            required
            value={data.brandName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded-md'/>
          <label className='mt-3' htmlFor='category'>Category : </label>
          <select value={data.category} required name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded-md'>
            <option value='' key={""}>Select category</option>
            {productCategory?.map((el,index) => {
              return (
                <option value={el.value} key={el.value+index}>{el.label}</option>
              )
            })}
          </select>
          <label className='mt-3' htmlFor='productImage'>Product Image : </label>
          <label htmlFor='uploadImageInput'>
          <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-600 flex justify-center items-center flex-col gap-2'>
                <span className='text-3xl'><IoCloudUpload/></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' name='productImage' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
              </div>
          </div>
          </label>
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data.productImage.map((el,index) => {
                      return (
                        <div className='relative group'>
                          <img 
                            src={el} 
                            alt={el} 
                            width={80} 
                            height={80} 
                            className='bg-slate-100 border cursor-pointer' 
                            onClick={()=>{
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }}/>
                            <div onClick={()=>handleDeleteProduct(index)} className='absolute bottom-0  hidden group-hover:block cursor-pointer right-0 p-1 text-white bg-red-600 rounded-full'>
                              <MdDelete />
                            </div>
                        </div>
                        
                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-500 text-xs'>*Please upload product image</p>
              )
            }
          </div>
          <label className='mt-3' htmlFor='price'>Price : </label>
          <input 
            name='price'
            type='number' 
            id='price' 
            required
            placeholder='Enter price' 
            value={data.price} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded-md'/>

          <label className='mt-3' htmlFor='selling'>Selling Price : </label>
          <input 
            name='selling'
            type='number' 
            id='selling' 
            required
            placeholder='Enter selling price' 
            value={data.selling} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded-md'/>

          <label className='mt-3' htmlFor='description'>Description : </label>
          <textarea 
            className='h-28 bg-slate-100 border resize-none p-1' 
            name='description' 
            value={data.description}
            onChange={handleOnChange} 
            placeholder='Enter product description' 
            rows={3}>

          </textarea>
          <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full mb-10'>Update Product</button>
        </form>

      </div>
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
      }

    </div>
  )
}

export default AdminEditProduct