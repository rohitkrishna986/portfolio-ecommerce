import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizonalCardProduct from '../components/HorizonalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizonalCardProduct heading={"Top's Airpodes"} category={"airpodes"}/>
      <HorizonalCardProduct heading={"Popular's Earphones"} category={"earphones"}/>
      <VerticalCardProduct heading={"Popular's Mobiles"} category={"mobiles"}/>
      <VerticalCardProduct heading={"Popular's Mouse"} category={"mouse"}/>
      <VerticalCardProduct heading={"Photography"} category={"camera"}/>
      <VerticalCardProduct heading={"Popular's Sounds"} category={"speakers"}/>
      <VerticalCardProduct heading={"Top Refridgerator"} category={"refridgerator"}/>
      <VerticalCardProduct heading={"Popular's Watches"} category={"watches"}/>
      <VerticalCardProduct heading={"Televisions"} category={"televisions"}/>
      <VerticalCardProduct heading={"Popular's Trimmers"} category={"trimmers"}/>
      <VerticalCardProduct heading={"Popular's Printers"} category={"printers"}/>
      <VerticalCardProduct heading={"Popular's Processor"} category={"processor"}/>
    </div>
  )
}

export default Home