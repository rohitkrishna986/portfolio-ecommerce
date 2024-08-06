import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assest/Logo.png'
import { IoSearch, IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../slice/userSlice.js';
import Role from '../common/Role.js';
import Context from '../context/index.jsx';

const Header = () => {
  const user = useSelector(state=> state.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuDisplay , setMenuDisplay] = useState(false)
  const context = useContext(Context);
  const searchInput = useLocation()
  const URLsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(summaryApi.userLogout.url,{
      method : summaryApi.userLogout.method,
      credentials : "include"
    })

    const data = await fetchData.json()
    if(data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if(data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const {value} = e.target;
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    } else {
      navigate('/search')
    }
  }

  return (
    <div className='container mx-auto flex justify-between h-16 shadow-md fixed w-full z-40 bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        <Link to={'/'}>
          <img src={Logo} width={150}/>
        </Link>
      

        <div className='hidden lg:flex items-center w-full justify-between border rounded-full max-w-sm focus-within:shadow-md'>
            <input onChange={handleSearch} value={search} className='w-full outline-none py-1 pl-2' type='text' placeholder='Search'/>
            <span className='text-lg min-w-[50px] h-8 bg-red-500 text-white hover:bg-red-600 cursor-pointer flex items-center justify-center rounded-r-full'><IoSearch/></span>
        </div>

        <div className='w-full max-w-[200px] flex justify-between mr-4'>
          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev=>!prev)}>
                  {
                    user?.name? (
                      <p className='text-lg bg-slate-200 border rounded-full px-2'>{user?.name}</p>
                    ) : (
                      <FaUserCircle/>
                    )
                  }
                </div>
              )
            }
              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit shadow-lg rounded-md'>
                    <nav>
                      {
                        user?.role == Role.Admin && (
                          <Link to={'/admin-panel/all-product'} className='hidden md:block whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev=>!prev)}>Admin panel</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }
          </div>
          {
              user?._id && (
                <Link to={'/cart'} className='text-3xl flex relative cursor-pointer'>
                  <IoCart/>
                  <p className='text-sm absolute right-[-5px] top-[-8px] text-white bg-red-500 px-1 rounded-full'>{context?.cartProductCount}</p>
                </Link>
              )
          }
          <div>
            {
              user?._id? (
                <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full'>Logout</button>
              ): (
                <Link to={'/login'} className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full'>Login</Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header