import React, { useState,useEffect } from 'react';
import '../stylings/ProductCard.css';

const ProductCard = ({ image, title, description, price,id,cartData,handleCardata}) => {
  const [itemvalue, setItemValue] = useState(0)
  const itemData = cartData.filter(item=>item.id == id)
  const handleIncrement = () =>{
    setItemValue(itemvalue +1)
    const Itemobj = {
      "id" : id,
      "title": title,
      "price": price,
      "count": itemvalue+1,
      "img": image
    }
    let newcartData = []
    if(cartData.length == 0){
      newcartData = [Itemobj]
    }
    else if(!(cartData.find((item)=>(item["id"] == id)))){
      newcartData = [...cartData,Itemobj]
    }
    else{
    newcartData = cartData.map((item)=>{
      if(item["id"] == id){
        return { ...item, count: item["count"] + 1 };
      }
      return item
    })
  }
    handleCardata(newcartData)
    localStorage.setItem("cart",JSON.stringify(newcartData))
  }
  const handleDecrement = () =>{
    setItemValue(itemvalue -1)
    let newcartData = []
    if(itemvalue == 1){
      newcartData = cartData.filter((item)=>(item["id"] != id))
    }
    else{
    newcartData = cartData.map((item)=>{
      if(item["id"] == id){
        return { ...item, count: item["count"] - 1 };
      }
      return item
    })
    }
    handleCardata(newcartData)
    if(newcartData.length != 0){
      localStorage.setItem("cart",JSON.stringify(newcartData))
    }
    else{
      localStorage.clear()
    }
  }

  useEffect(() =>{
    if(itemData.length){
      setItemValue(itemData[0]["count"])
    }
  },[itemvalue])
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>
        {itemvalue == 0 ? <button className="card-btn" onClick={handleIncrement}>Add to Cart</button>
        : <div>
          <button className="card-btn" onClick={handleIncrement}>+</button>
          {itemvalue}
          <button className="card-btn" onClick={handleDecrement}>-</button>
        </div>}
      </div>
    </div>
  );
};

export default ProductCard;