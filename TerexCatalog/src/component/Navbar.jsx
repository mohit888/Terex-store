import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import "../stylings/Nav.css"
function Navbar() {
  return (
    <div className='nav-1'>
      <div className='prod-name'>
        <h2>TeeRex Store</h2>
      </div>
      <div className='prod-cart'>
      <h3 id = "product">Products</h3>
      <a href='/cart'>
      <FiShoppingCart />
      </a>
      </div>
    </div>
  )
}

export default Navbar
