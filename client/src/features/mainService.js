import axios from "axios";
import { BACK_URL } from "../keys";


const getTeams = async() =>{
  const response = await axios.get(`${BACK_URL}/teams`);
  return response.data;
};

const getDrivers = async() =>{
  const response = await axios.get(`${BACK_URL}/drivers`);
  return response.data;
};

const getDriversByName = async(name) =>{
  const response = await axios.get(`${BACK_URL}/drivers?name=${name}`);
  
  return response.data;
};

const getDriverById = async(id) =>{
  const response = await axios.get(`${BACK_URL}/drivers/${id}`);
  
  return [response.data];
};

const createDriver = async(driver) =>{
  const response = await axios.post(`${BACK_URL}/drivers/`, driver);

  return response.data;
};


export const mainService = {
  getTeams,
  getDrivers,
  getDriversByName,
  getDriverById,
  createDriver
}