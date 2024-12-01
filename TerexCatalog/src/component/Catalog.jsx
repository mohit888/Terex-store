import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import "../stylings/Catalog.css";
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';

function Catalog({ data, cartData, handleCardata }) {
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
      console.log(colorFilter && genderFilter && priceFilter && typeFilter)
      return colorFilter && genderFilter && priceFilter && typeFilter;
    });
  };

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

  return (
    <>
      <div className='catalog_class'>
        {finalData.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.imageURL}
            title={item.name}
            cartData={cartData}
            handleCardata={handleCardata}
            description="This is a brief description of the product."
            price={item.price}
          />
        ))}
      </div>
      <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={finalData ? parseInt(finalData.length/8 + (finalData % 8 == 0 ?0 :1)) : parseInt(data.length/8) + (data % 8 == 0 ?0 :1)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
      />
  </>
  );
}

export default Catalog;
