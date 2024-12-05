import React,{useEffect,useState} from 'react'
import CartItem from './CartItem'
import "../stylings/Cart.css"

function Cart({data}) {
  const [cartData,setCartData] =useState([])
  console.log9
  const totalValue = cartData.reduce((acc,item)=> acc+item.count*item.price,0 )
  const handleCardata =(updatedCartData) =>{
    setCartData(updatedCartData)
  }
  const findTotalQuantity = (id) =>{
    const result = data?.filter((da)=>da.id == id)
    return result[0]?.quantity
  }
  useEffect(()=>{
    if(localStorage.getItem("cart")){
      setCartData(JSON.parse(localStorage.getItem("cart")))
      findTotalQuantity()
    }
  },[localStorage])
  return (
    (cartData.length > 0 ? <div>
      {
        cartData?.map((item)=>(
                <CartItem key={item.id} id = {item.id} name = {item.title} image = {item.img} quantity = {item.count} price = {item.price} handleCardata = {handleCardata} totalQuantity = {findTotalQuantity(item.id)}/>
        ))
      }
      <div className='total'>
        <h4>Total</h4>
        <h4>{totalValue}</h4>
      </div>
    </div>
    : <>
        <h1>Cart is empty</h1>
      </>)
  )
}


export default React.memo(Cart)
