import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../common/Role.js';

const AdminPanel = () => {
  const user = useSelector(state=> state.user?.user)
  const navigate = useNavigate()

  useEffect(()=> {
    if(!user?.role==Role.Admin) {
      navigate('/')
    }
  },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden '>
      <aside className='bg-white min-h-full w-full max-w-60 shadow-md'>
        <div className='bg-slate-200 min-h-20 flex flex-col justify-center items-center'>
          <div className='font-bold'>{user?.name}</div>
          <div>{user?.role}</div>
        </div>
        <div>
          <nav className='grid p-4'>
            <Link className='px-2 py-2 hover:bg-slate-100' to={'all-user'}>All users</Link>
            <Link className='px-2 py-2 hover:bg-slate-100' to={'all-product'}>All Products</Link>
          </nav>
        </div> 
      </aside>

      <main className='w-full h-full p-2'>
        {
          user?.role == Role.Admin && (
            <Outlet/>
          )
        }
      </main>
    </div>
  )
}

export default AdminPanel