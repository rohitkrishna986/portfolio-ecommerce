import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import summaryApi from './common/index.js';
import Context from './context/index.jsx';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './slice/userSlice.js';

function App() {
  const dispatch = useDispatch();
  const[cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
      const dataResponse = await fetch(summaryApi.userDetails.url, {
        method: summaryApi.userDetails.method,
        credentials: "include"
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } 
  };

  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(summaryApi.countAddToCart.url, {
      method: summaryApi.countAddToCart.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount,
      fetchUserAddToCart
      }}>
      <ToastContainer position="top-center"/>
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
