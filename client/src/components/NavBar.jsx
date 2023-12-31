import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDrivers, getDriversByName } from '../features/mainSlice';
import { FilterContext } from '../contexts/filtersContext';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const [input, setInput] = useState(null);
  const data = useContext(FilterContext);
  const { setNavbarSearchValue } = data;

  const handleDriversByName = async (e) => {
    setNavbarSearchValue(input)
    if(!input) {
      dispatch(getDrivers());  
    } else {
      dispatch(getDriversByName(input));
    }
  };

  useEffect(() => {
    const validateTheme = localStorage.getItem("theme");
    if(!validateTheme){
      localStorage.setItem("theme", "light");
    }else{
      setTheme(validateTheme);
    }
  }, []);

  return ( 
    <div className={`navbar-wrapper`}>
      <div className='f1-icon'>
        <div>
          <img src="/images/f1-icon.svg" style={{cursor: "pointer"}} alt="abc" onClick={()=> navigate("/home")}/>
        </div>
        <div>
          <span>Drivers</span>
        </div>
      </div>
      <div className='navbar-input d-flex align-items-center position-relative'>
        <input type="text" placeholder='Enter drivers last name...' className={`position-relative`} onChange={(e)=> setInput(e.target.value)} value={input} style={{boxShadow: theme === "dark" ? "none" : "0 0 0.5rem lightgrey", backgroundColor:"white"}} onKeyDown={(e)=> e.key === "Enter" && handleDriversByName()}/>
        <div className='nav-bar-search position-absolute'>
          <img src="/images/search.svg" alt="abc" width={25} height={25} onClick={handleDriversByName}/>
        </div>
      </div>

      <div className='navbar-icons'>
        <div className="button-slide-g">
          <div className='navbar-icons-div-g' onClick={()=> window.open("https://www.github.com/macamvv", "window", "width=800, height=800")}>
            <img src="/images/githubWhite.svg" alt="" />
          </div>
          <span>Github</span>
        </div>

        <div className='button-slide-l'>
          <div className='navbar-icons-div-l' onClick={()=> window.open("https://www.linkedin.com/in/macarena-maria-villagra-velez-0a61731b0/", "window", "width=800, height=800")}>
            <img src="/images/linkedin.svg" alt="" />
          </div>
          <span>Linkedin</span>
        </div>
      </div>

      <div className='new-driver'>
        <button onClick={()=> navigate("/add-driver")}>Add Driver</button>
      </div>
    </div>
   );
}
 
export default NavBar;