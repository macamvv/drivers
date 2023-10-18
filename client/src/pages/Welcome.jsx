import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnter = () =>{
    setTimeout(()=>{
      navigate("/home");
    },500)
  };

  return ( 
    <div className='welcome-wrapper'>
      <div class="wrapper">
        <ul class="dynamic-txts">
          <li><span>Are you ready...?</span></li>
          <li><span>Meet our drivers...</span></li>
          <li><span>Feel the adrenaline</span></li>
          <li><span>The faster, the better!</span></li>
        </ul>
      </div>
      <div className="welcome-container">
        <div className='welcome-img'>
          <img src="/images/autos banderas.png" alt="" />
        </div>
        <div className='welcome-btn-div' style={{width:"20%"}}>
          <button className="welcome-btn" onClick={handleEnter}>GO</button>
        </div>
      </div>
    </div>
   );
}
 
export default Welcome;