import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import "../stylings/search.css"

function Search({data}) {
  const [searchParams,setSearchParams] = useSearchParams()
  const [searchData,setSearchData] = useState("")

  const updateUrlParams = (key, values) => {
    if (values.length) {
        setSearchParams({})
      searchParams.set(key, values);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  }


  const handleOnClick = ()=>{
    updateUrlParams('search',searchData)
  }
  
  return (
    <div className='search-button-container'>
        <input id ="inp" type='search' placeholder='search' onChange={(e)=>setSearchData(e.target.value)}></input>
        <button id ="search-button" onClick={handleOnClick}>search</button>
    </div>
  )
}

export default Search
