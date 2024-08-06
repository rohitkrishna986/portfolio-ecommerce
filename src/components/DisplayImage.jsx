import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayImage = ({imgUrl, onClose}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-md rounded max-w-5xl mx-auto p-4'>
            <div>
                <button onClick={onClose} className='block ml-auto text-red-600 text-xl'><IoClose/></button>
            </div>
            <div className='flex justify-center p-4 max-h-[80vh] max-w-[80vh]'>
                <img src={imgUrl} className='w-full h-full'/>
            </div>
        </div>
        
    </div>
  )
}

export default DisplayImage