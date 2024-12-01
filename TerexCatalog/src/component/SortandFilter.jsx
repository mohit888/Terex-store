import React,{useEffect, useState } from 'react'
import CheckBox from './CheckBox'
import "../stylings/SortandFilter.css"
import {useLocation } from 'react-router-dom';

function SortandFilter({data}) {
    const [colorFilter,setColorFilter] = useState([])
    const [genderFilter,setGenderFilter] = useState([])
    const [priceFilter,setPriceFilter] = useState([])
    const [typeFilter,setTypeFilter] = useState([])
    const [filterobj,setFilterObj] = useState({})

    let location = useLocation()
    
    useEffect(()=>{
      let obj = {}
      location.search?.slice(1)?.split('&').forEach((item)=>{
        let itemArray = item?.split("=")
        if(itemArray[1]?.split("-").length >0){
            obj[itemArray[0]] = itemArray[1]?.split("-")
        }
      })
      setFilterObj(obj)
    },[location])

    useEffect(()=>{
        filterobj['color']? setColorFilter(filterobj['color']): setColorFilter([])
        filterobj['gender']?setGenderFilter(filterobj['gender']):setGenderFilter([])
        filterobj['type']?setTypeFilter(filterobj['type']):setTypeFilter([])
        filterobj['price']?setPriceFilter(filterobj['price']):setPriceFilter([])
    },[filterobj])


    let color = new Set()
    let gender = new Set()
    let price = new Set()
    let Type =  new Set()

    const getData = (function() {
        data.map((item)=>{
            color.add(item.color)
            gender.add(item.gender)
            price.add(item.price)
            Type.add(item.type)
        })
    }())
    return (
        <div className='filter'>
        <CheckBox heading = {"Color"} checkData = {Array.from(color)} filterComponent = {colorFilter}/>
        <CheckBox heading = {"Gender"} checkData = {Array.from(gender)}  filterComponent = {genderFilter}/>
        <CheckBox heading = {"Price"} checkData = {Array.from(price)}   filterComponent = {priceFilter}/>
        <CheckBox heading = {"Type"} checkData = {Array.from(Type)}  filterComponent = {typeFilter}/>
        </div>
    )
}

export default SortandFilter
