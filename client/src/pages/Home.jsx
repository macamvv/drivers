import React from 'react';
import NavBar from '../components/NavBar';
import Filters from '../components/Filters';
import AllDrivers from '../components/AllDrivers';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='home-wrapper'>
      <NavBar />
      <Filters/>
      <div className="pagination-main-container">
        <Pagination />
      </div>
      <AllDrivers />
      <Footer />
    </div>
  );
}

export default Home;