import React from 'react';
import { useNavigate } from 'react-router-dom';

const DriverSmallCard = ({img, nombre, apellido, driverId, escuderias}) => {
 
  const navigate = useNavigate();
 
  return ( 
    <div className='driver-card'>
      <div className='driver-card-image'>
        <img src={img} alt="abc" onClick={()=>navigate(`/driver/${driverId}`)} width={400} height={296.15}/>
      </div>
      <div className='driver-card-details'>
        <div className='driver-card-title'>
          <span>{`${nombre} ${apellido}`}</span>
        </div>
        <div className='driver-card-teams'>
            <>Teams</>
            {escuderias && escuderias.length && escuderias.map((el, index) => <div><ul><li className='team-list-item'><span>{`-   ${el}`}</span></li></ul></div>)
            }
        </div>
      </div>
    </div>
   );
}
 
export default DriverSmallCard;