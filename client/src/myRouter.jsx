import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import SingleDriver from './pages/SingleDriver';
import AddDriver from './pages/AddDriver';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/driver/:id" element={<SingleDriver />} />
        <Route exact path="/add-driver" element={<AddDriver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;