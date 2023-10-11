import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getDrivers } from '../features/mainSlice';
import { FilterContext } from '../contexts/filtersContext';


//EN ESTE ARCHIVO SE DETERMINA LA CANTIDAD DE DRIVERS QUE VAN A FIGURAR EN LA PAGINA.
// EN TOTAL DEBEN FIGURAR 9
const Pagination = () => {

  const dispatch = useDispatch();
  const data = useContext(FilterContext);
  const { setPageStart, setPageLimit, pageLimit } = data;

  const state = useSelector(state => state.mainData);
  const { drivers } = state;

  const [pageNumbers, setPageNumbers] = useState([]);

  const handlePagination = (e) =>{
    setPageStart(e.target.name);
    setPageLimit(Number(e.target.name) + 9);
  };

  
  let pageIndex = -9;

  useEffect(() => {
    if(drivers.length){
      let quantity = [];
      let manyPages = [];
      for(let i = 0; i < drivers.length; i++){
        quantity.push(i);
      };
      let index = Math.ceil(quantity.length / 9);
      for(let i = 0; i < index; i++){
        manyPages.push(i);
      };
      setPageNumbers(manyPages);
    }else{
      setPageNumbers([]);
    }
  }, [drivers]);

  return ( 
    <div className="pagination-wrapper-container">
      <div className="pagination-wrapper d-flex align-items-center justify-content-center">
        {pageNumbers.length > 0 && pageNumbers.map((el, index) => {
          pageIndex += 9;
          return (
            <button className="pag-btn" name={Number(pageIndex)} onClick={handlePagination}>{el + 1}</button>
          )
        })}
      </div>
    </div>
   );
}
 
export default Pagination;