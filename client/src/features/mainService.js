import axios from "axios";
import { BACK_URL } from "../keys";

const createDriver = async(driver) =>{
  const response = await axios.post(`${BACK_URL}/drivers/`, driver);

  return response.data;
};


export const mainService = {
  createDriver
}