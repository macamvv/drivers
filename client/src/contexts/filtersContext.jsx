import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({children}) =>{
  const [pageStart, setPageStart] = useState(0);
  const [pageLimit, setPageLimit] = useState(9);
  const [navBarSearchValue, setNavbarSearchValue] = useState(false);

  const data = {
    pageStart,
    setPageStart,
    pageLimit,
    setPageLimit,
    navBarSearchValue,
    setNavbarSearchValue,
  };

  return <FilterContext.Provider value={data}>{children}</FilterContext.Provider>
};