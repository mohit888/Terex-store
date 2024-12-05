import './App.css'
import Catalog from './component/Catalog'
import Cart from './component/Cart'
import Navbar from './component/Navbar'
import SortandFilter from './component/SortandFilter'
import axios from "axios"
import React, {useEffect, useState } from 'react'
import Search from './component/Search'
import {Route, Routes} from 'react-router-dom';



function App() {
  const [data,setData] = useState([]);

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
                <Catalog data={data} />
              </div>
              </>
            </Layout>
          </>
        } />
        <Route path="/cart" element={<Layout><Cart data={data}/> </Layout>} />
      </Routes>
    </>
  )
}

export default App
