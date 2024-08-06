import React, { useState } from 'react'
import Role from '../common/Role.js'
import { IoClose } from "react-icons/io5";
import summaryApi from '../common/index.js';
import {toast} from 'react-toastify'

const changeUserRole = ({
  name, email, role, onClose, userId, callFunc
}) => {
  const [userRole, setUserRole] = useState(role);

  const updateUserRole = async() => {
    const dataResponse = await fetch(summaryApi.updateUser.url, {
      method : summaryApi.updateUser.method,
      credentials: "include",
      headers : {"content-type" : "application/json"},
      body : JSON.stringify({
        userId : userId,
        role : userRole
      })
    })
    const data = await dataResponse.json()
    if(data.success) {
      toast.success(data.message)
      onClose()
      callFunc()
    }
    console.log(data);
    
  }
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <div>
          <button onClick={onClose} className='block ml-auto text-red-600 text-lg'><IoClose/></button>
        </div>
        <h2 className='pb-4 text-lg font-medium'>Change User Role</h2>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className='w-full flex items-center justify-between my-4'>
          <p>Role : </p>
          <select className='border px-4 py-1' value={userRole} onChange={(e)=> setUserRole(e.target.value)}>
            {
              Object.values(Role).map((el,index)=> {
                return (
                  <option value={el} key={el}>{el}</option>
                )
              })
            }
          </select>
        </div>
        <button onClick={updateUserRole} className='w-fit mx-auto block bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600'>Change</button>
      </div>
    </div>
  )
}

export default changeUserRole;