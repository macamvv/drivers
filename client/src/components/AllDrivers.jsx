import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers } from '../redux/Actions/DriversActions';

import DriverSmallCard from '../utils/driverSmallCard';
import { FilterContext } from '../contexts/filtersContext';

const AllDrivers = () => {
  const dispatch = useDispatch();
  const data = useContext(FilterContext);
  const { pageStart, pageLimit } = data;

  const state = useSelector(state => state);
  const { drivers } = state;

  const [driversData, setDriversData] = useState([]);

  useEffect(() => {
    dispatch(getAllDrivers())
  }, []);

  useEffect(() => {
    let getPages = [];
    for (let i = 0; i < drivers.length; i++) {
      if (i >= pageStart && i < pageLimit) {
        getPages.push(drivers[i]);
      };
    }
    setDriversData(getPages);
  }, [drivers, pageStart, pageLimit]);

  return (
    <div className="all-drivers-wrapper">
      {driversData.length > 0 ? driversData.map((el, index) => <DriverSmallCard key={index} escuderias={el.teams} img={el.imagen} nombre={el.nombre} apellido={el.apellido} descripcion={el.descripcion} fromApi={el.fromApi} driverId={el.id} />)
        :
        <div>
          <div className='position-relative'>
            <p>Our Searcher couldn't find any Driver with that name!</p>
          </div>
        </div>
      }
    </div>
  );
}

export default AllDrivers;