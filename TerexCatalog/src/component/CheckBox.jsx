import React from 'react'
import { useState,useEffect} from 'react';
import { useSearchParams,useLocation } from 'react-router-dom'


function CheckBox({heading,checkData,filterComponent}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilter= (heading,data)=>{
    console.log(filterComponent,'coming')
    if(filterComponent?.includes(data)){
        const updatedData = filterComponent.filter(col => col != data)
        updateUrlParams(heading.toLowerCase(), updatedData);
    }
    else{
        const updatedData = [
            ...filterComponent,
            data
        ]
        updateUrlParams(heading.toLowerCase(), updatedData);
    }
}

useEffect(() =>{
  updateUrlParams(heading.toLowerCase, filterComponent)
},[])

const updateUrlParams = (key, values) => {
    if (values.length) {
      searchParams.set(key, values.join('-'));
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h3>{heading}</h3>
      <div className='checks'>
        {checkData.map((item,index)=>(
            <label key = {item}>
                <input type='checkbox' defaultChecked= {filterComponent?.includes(item)} value = {item} onClick={(e)=> handleFilter(heading,e.target.value)}></input>
                {item}
            </label>
        ))}
      </div>
    </div>
  )
}

export default CheckBox
