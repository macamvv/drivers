import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, getDriversByTeam, getDriversBySource, getDrivers, getDriversByTeamAndSource, sortDriversByLastName } from '../features/mainSlice';
import { FilterContext } from '../contexts/filtersContext';


const Filters = () => {
  const refSelect = useRef();
  const refOption = useRef();
  const refSelect2 = useRef();
  const refOption2 = useRef();
  const refSelect3 = useRef();
  const refOption3 = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.mainData);
  const { teams } = state;

  const [teamFilter, setTeamFilter] = useState(null);
  const [sourceFilter, setSourceFilter] = useState(null);

  const data = useContext(FilterContext);
  const { setPageStart, setPageLimit, navBarSearchValue } = data;

  const sortByLastName = (e) =>{
    dispatch(sortDriversByLastName(e.target.value)) 
  };

  const filterByTeams = (e) =>{
    setTeamFilter(e.target.value);
    if(sourceFilter && sourceFilter !== "mix") {
      dispatch(getDriversByTeamAndSource({ team: e.target.value, source: sourceFilter })) 
    } else {
      dispatch(getDriversByTeam(e.target.value));
    }
    refSelect3.current.value = refOption3.current.value;
  };

  const filteredByCreated = (e) => {
    setSourceFilter(e.target.value);
    if(teamFilter) {
      if(e.target.value === "mix") {
        dispatch(getDriversByTeam(teamFilter));
      } else {
        dispatch(getDriversByTeamAndSource({ team: teamFilter, source: e.target.value })) 
      }
    } else {
      if(e.target.value === "mix") {
        dispatch(getDrivers());
      } else {
        dispatch(getDriversBySource(e.target.value));
      }
    }
    refSelect3.current.value = refOption3.current.value;
    setPageStart(0);
    setPageLimit(9);
  };
  
  const resetFilters = () => {
    setTeamFilter(null);
    setSourceFilter(null);
    dispatch(getDrivers());
    refSelect.current.value = refOption.current.value;
    refSelect2.current.value = refOption2.current.value;
    refSelect3.current.value = refOption3.current.value;
    setPageStart(0);
    setPageLimit(9);
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    setTeamFilter(null);
    setSourceFilter(null);
    refSelect.current.value = refOption.current.value;
    refSelect2.current.value = refOption2.current.value;
    refSelect3.current.value = refOption3.current.value;
    setPageStart(0);
    setPageLimit(9);    
  }, [navBarSearchValue]);

  return ( 
    <div className='filters-wrapper'>
      <div className='filters-container'>
        <div className='filters-select'>
          <select ref={refSelect3} name="" id="" onChange={sortByLastName} defaultValue="disabled">
            <option ref={refOption3} value="disabled" disabled>Alphabetically</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
        </div>
        <div className='filters-select'>
          <select ref={refSelect} name="" id="" onChange={filterByTeams} defaultValue="disabled">
            <option ref={refOption} value="disabled" disabled>By Team</option>
            {
              teams.map((el, index) => (
                <option key={index} value={el.nombre}>{el.nombre}</option>    
              ))
            }
          </select>
        </div>
        <div className='filters-select'>
          <select ref={refSelect2} name="" id="" defaultValue="disabled" onChange={filteredByCreated}>
            <option ref={refOption2} value="disabled" disabled>Created In</option>
            <option value="mix">Mix</option>
            <option value="api">API</option>
            <option value="db">Created By People</option>
          </select>
        </div>
        <div className='reset-filters' >
          <img src="images/clear.svg" alt="abc" onClick={resetFilters}/>
        </div>
      </div>
    </div>
   );
}
 
export default Filters;