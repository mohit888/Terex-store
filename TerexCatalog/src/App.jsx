import './App.css'
import Catalog from './component/Catalog'
import Cart from './component/Cart'
import Navbar from './component/Navbar'
import SortandFilter from './component/SortandFilter'
import axios from "axios"
import React, { Children, useEffect, useState } from 'react'
import Search from './component/Search'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';



function App() {
  const [data,setData] = useState([]);
  const [cartData,setCartData] =useState([])
  const handleCardata = (updatedCartData) =>{
    setCartData(updatedCartData)
  }

  const Layout = ({children}) => (
    <>
        <Navbar/>
        {children}
    </>
  )
  useEffect(()=>{
    axios
    .get("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json")
    .then(response => {
      setData(response.data)
    })
    .catch(error => {
      console.log(error)
    })
    if(localStorage.getItem("cart")){
      setCartData(JSON.parse(localStorage.getItem("cart")))
    }
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Layout> 
              <>
              <Search data={data} />
              <div className='main'>
                <SortandFilter data={data} />
                <Catalog data={data} handleCardata={handleCardata} cartData={cartData} />
              </div>
              </>
            </Layout>
          </>
        } />
        <Route path="/cart" element={<Layout><Cart handleCardata={handleCardata} cartData={cartData} /> </Layout>} />
      </Routes>
    </>
  )
}

export default App
