import React, { useEffect, useState } from 'react'
import summaryApi from '../common/index.js'
import {toast} from 'react-toastify'
import moment from 'moment';
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from '../components/changeUserRole.jsx'

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  const [openUpdateUser, setOpenUpdateUser] = useState(false)
  const [updateUser, setUpdateUser] = useState({
    email:"",
    name: "",
    role : "",
    _id : ""
  })

  const fetchAllUsers = async() => {
    const dataResponse = await fetch(summaryApi.allUsers.url,{
      method : summaryApi.allUsers.method,
      credentials :"include"
    })
    const data = await dataResponse.json()

    if(data.success) {
      setAllUsers(data.data)
    }
    if(data.error) {
      toast.error(data.message)
    }
  }
  useEffect(()=>{
    fetchAllUsers()
  },[])

  return (
    <div>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((allUsers,index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{allUsers?.name}</td>
                <td>{allUsers?.email}</td>
                <td>{allUsers?.role}</td>
                <td>{moment(allUsers?.createdAt).format("ll")}</td>
                <td>
                  <button 
                    onClick={()=> {
                      setUpdateUser(allUsers)
                      setOpenUpdateUser(true)
                    }}
                    className='bg-green-300 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'><CiEdit/></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
          {
            openUpdateUser && (
              <ChangeUserRole 
                onClose={()=>setOpenUpdateUser(false)} 
                name={updateUser.name} 
                email={updateUser.email}
                userId={updateUser._id} 
                role={updateUser.role}
                callFunc={fetchAllUsers}/>
            )
          }
    </div>
  )
}

export default AllUsers