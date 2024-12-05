import React from 'react'
import { Link } from 'react-router-dom';

import { FiShoppingCart } from "react-icons/fi";
import "../stylings/Nav.css"
function Navbar() {
  return (
    <div className='nav-1'>
      <div className='prod-name'>
        <h2>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        TeeRex Store
        </Link>
        </h2>
      </div>
      <div className='prod-cart'>
      <a href='/cart'>
      <FiShoppingCart  size={20}/>
      </a>
      </div>
    </div>
  )
}

export default Navbar
