import React,{useEffect,useState} from 'react'
import CartItem from './CartItem'
import "../stylings/Cart.css"

function Cart({handleCardata,cartData}) {
  // const[localData,setLocalData] = useState([])
  // useEffect(()=>{
  //   const localDa = JSON.parse(localStorage.getItem("cart"))
  //   setLocalData(localDa)
  // },[localStorage])
  // // const result = data.filter((value)=> localDa.includes(value.id))
  return (
    <div>
      {
        cartData?.map((item)=>(
                <CartItem key={item.id} id = {item.id} name = {item.title} image = {item.img} quantity = {item.count} handleCardata = {handleCardata}/>
        ))
      }
    </div>
  )
}


export default Cart
