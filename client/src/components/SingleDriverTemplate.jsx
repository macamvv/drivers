import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDriverById } from '../redux/Actions/DriversActions';

const SingleDriverTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { drivers } = state;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDriverById(id));
  }, []);

  return ( 
    <div className="single-driver-wrapper">
      <div className='w-60 sr-details'>
        <div className='d-flex align-items-center' style={{marginBottom:"2rem", color:"#777777", cursor:"pointer"}} onClick={()=> navigate("/home")}>
          <img src="/images/go-back.svg" alt="abc" style={{marginTop: "12px "}}/>
          <span>Go Back Home</span>
        </div>
        <div className="sr-title">
          <p>{`${drivers[0]?.nombre} ${drivers[0]?.apellido} (${drivers[0]?.nacionalidad})`}</p>
        </div>
      </div>
      <div className='w-40'>
        <div className="sr-main-image">
            <img src={drivers[0]?.imagen} alt="abc" />
        </div>
        <div>
          <p>{`DOB: ${drivers[0]?.fecha_de_nacimiento}`}</p>
          <div className='sr-teams'>
            <>Teams</>
            {
              drivers[0]?.teams && drivers[0]?.teams.length ? 
                drivers[0]?.teams.map((el, index) => <div key={index} className='driver-card-ul-single'><p>{`-     ${el}`}</p></div>)
                : null
            }
          </div>
          <p style={{ lineHeight:"28px" }}>{drivers[0]?.descripcion}</p>
        </div>
      </div>
    </div>
   );
}
 
export default SingleDriverTemplate;