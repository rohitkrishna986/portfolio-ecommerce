import React, { useState } from 'react'
import login from '../assest/signin.gif'
import {Link, useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import summaryApi from '../common/index.js'
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const[data , setData] = useState({
      name: "",
      email: "",
      password : "",
      confirmPassword : ""
    })

    const navigate = useNavigate()
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setData((preve)=>{
        return {
          ...preve,
          [name] : value
        }
      })
    }
    const handleSumbit = async(e)=> {
      e.preventDefault()
      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(summaryApi.register.url,{
          method: summaryApi.register.method,
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()
        if(dataApi.success) {
          toast.success(dataApi.message)
          navigate('/login')
        } 
        if (dataApi.error) {
          toast.error(dataApi.message)
        }
      } else {
        toast.error("Please check password")
      }
    }

    console.log(data);

  return (
    <div>
      <div className='container mx-auto mt-8'>
        <form className='bg-white shadow-md max-w-md mx-auto' onSubmit={handleSumbit}>
          <div className='mx-auto flex justify-center py-4'>
            <img className='w-20' src={login}/>
          </div>
          <div className='grid px-4 gap-2 mb-2'>
              <label className='font-semibold pl-2'>Name</label>
              <input 
                type='text' 
                className='border outline-none border-gray-400 rounded-full px-2 py-1'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
              />
          </div>
          <div className='grid px-4 gap-2 mb-2'>
              <label className='font-semibold pl-2'>Email</label>
              <input 
                type='text' 
                className='border outline-none border-gray-400 rounded-full px-2 py-1'
                name='email'
                value={data.email}
                onChange={handleChange}
                required
              />
          </div>
          <div className='grid px-4 gap-2 mb-2'>
              <label className='font-semibold pl-2'>Password</label>
              <div className='w-full flex relative'>
                <input
                  type={showPassword? 'text' : 'password'} 
                  className='w-full border outline-none border-gray-400 rounded-full px-2 py-1'
                  name='password'
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <span className='absolute right-2 top-2' onClick={()=>setShowPassword((e)=>!e)}>
                  {showPassword ? 
                    <FaEyeSlash/> :
                    <FaEye/>
                  }
                </span>
              </div>
          </div>
          <div className='grid px-4 gap-2 mb-2'>
              <label className='font-semibold pl-2'>Confirm Password</label>
              <div className='w-full flex relative'>
              <input
                type={showPassword? 'text' : 'password'} 
                className='w-full border outline-none border-gray-400 rounded-full px-2 py-1'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                required
              />
                <span className='absolute right-2 top-2' onClick={()=>setShowPassword((e)=>!e)}>
                  {showPassword ? 
                    <FaEyeSlash/> :
                    <FaEye/>
                  }
                </span>
              </div>
          </div>
          <div className='flex justify-center'><button className='bg-red-500 px-4 py-1 rounded-full text-white hover:bg-red-600'>Register</button></div>
          <div className='px-4 py-4'><p>Already have an account ? <Link to={'/login'} className='hover:text-red-500 cursor-pointer'>Login</Link></p></div>
        </form>
      </div>
    </div>
  )
}

export default Register