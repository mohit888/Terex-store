import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import "../stylings/Catalog.css";
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';

function Catalog({ data}) {
  const [cartData,setCartData] =useState([])
  const [pageCount,setPageCount] = useState(0)
  const [initialValue,setInitialValue] = useState(0)
  const [nextValue,setNextValue] = useState(8)
  const handleCardata =(updatedCartData) =>{
    setCartData(updatedCartData)
  }
  const location = useLocation();
  const [finalData, setFinalData] = useState([]);
  const searchParameters = Object.keys(Object.assign({}, ...data));

  const search = (data, searchData) => {
    if (!searchData) return data;
    return data.filter((item) =>
      searchParameters.some((param) =>
        item[param]?.toString().toLowerCase().includes(searchData)
      )
    );
  };

  const checkFilter = (data, filterObj) => {
    return data?.filter((item) => {
      const colorFilter = filterObj['color'] ? filterObj['color'].includes(item['color']) : true;
      const genderFilter = filterObj['gender'] ? filterObj['gender'].includes(item['gender']) : true;
      const priceFilter = filterObj['price'] ? filterObj['price'].includes(item['price'].toString()) : true;
      const typeFilter = filterObj['type'] ? filterObj['type'].includes(item['type']) : true;
      return colorFilter && genderFilter && priceFilter && typeFilter;
    });
  };

  const handlePageClick = (event) =>{
    console.log("mohit")
    setInitialValue((8 * (event.selected+1)) - 8)
    setNextValue((8 * (event.selected+1)))
    console.log(initialValue,nextValue,event.selected+1)
  }


  useEffect(()=>{
    if(localStorage.getItem("cart")){
      setCartData(JSON.parse(localStorage.getItem("cart")))
    }
  },[])

  useEffect(() => {
    const filterObj = location.search?.slice(1)?.split('&').reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = value?.split('-') || [];
      return acc;
    }, {});

    if (Object.keys(filterObj).length > 0 && data.length > 0) {
      const searchData = filterObj['search']?.[0] || '';
      const searchDataFiltered = search(data, searchData);
      const newData = searchDataFiltered.length ? checkFilter(searchDataFiltered, filterObj) : checkFilter(data, filterObj);
      setFinalData(newData);
    } else {
      setFinalData(data);
    }
  }, [location.search, data]);

  useEffect(()=>{
    setPageCount(finalData ? parseInt(finalData.length/8 + (finalData % 8 == 0 ?0 :1)) : parseInt(data.length/8) + (data % 8 == 0 ?0 :1))
  },[finalData])

  return (
      <div className={`catalog_class ${finalData.length <= 4 ? 'single-row' : ''}`}>
        {
          finalData?.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.imageURL}
              title={item.name}
              cartData={cartData}
              quantity={item.quantity}
              handleCardata={handleCardata}
              description="This is a brief description of the product."
              price={item.price}
            />
          ))
        }
      {/* <ReactPaginate

                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}       
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
      /> */}
  </div>
  );
}

export default React.memo(Catalog);
