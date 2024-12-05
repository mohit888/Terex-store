import React from 'react';
import "../stylings/Cart.css"

const CartItem = ({name,image,quantity,id,price,totalQuantity,handleCardata}) => {
  console.log(totalQuantity,"coming from itmecart")
  const updateQuantity = (e)=>{
    const localData = JSON.parse(localStorage.getItem("cart"))
    const updatedData = localData.map(item =>
      item.id === id ? { ...item, count: parseInt(e.target.value) } : item
    );
    localStorage.setItem("cart",JSON.stringify(updatedData))
    handleCardata(updatedData)
  }
  const removeItem = ()=>{
    const localData = JSON.parse(localStorage.getItem("cart"))
    const updatedData = localData.filter((item)=> item.id !== id)
    updatedData.length == 0?localStorage.clear():localStorage.setItem("cart",JSON.stringify(updatedData))
    handleCardata(updatedData)
  }

  return (
    <div className="cart-container">
      <div className="cart-item">
        <img src={image} alt={name} className="cart-item-image" />
        <div className="cart-item-details">
          <h3>{name}</h3>
          <div className="cart-item-controls">
            <div>
            <span>Quantity: </span>
            <select className="quantity-dropdown" defaultValue={quantity} onChange={(e)=>updateQuantity(e)}>
              {[...Array(totalQuantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button className="delete-button" onClick={removeItem}>Delete</button>
            </div>
            <h5>{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartItem;
