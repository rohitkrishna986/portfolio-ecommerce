import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct.jsx';
import displayINR from '../helper/displayCurrency.jsx'

const AdminProductCard = ({
    data, fetchData
}) => {

    const [editProduct, setEditProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded '>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>
                <p className='font-semibold'>
                    {
                        displayINR(data.selling)
                    }
                </p>
                <div onClick={()=> setEditProduct(true)} className='w-fit ml-auto p-2 hover:bg-green-600 cursor-pointer bg-green-400 rounded-full text-white'>
                    <MdEdit/>
                </div>
            </div>
            {
                editProduct && (
                    <AdminEditProduct fetchData={fetchData} onClose={()=>setEditProduct(false)} ProductData={data}/>
                )
            }
        </div>
    </div> 
  )
}

export default AdminProductCard