import {
  GET_ALL_DRIVERS,
  GET_DRIVERS_BY_NAME,
  GET_DRIVERS_BY_TEAM,
  GET_DRIVERS_BY_TEAM_AND_SOURCE,
  GET_DRIVERS_BY_SOURCE,
  GET_ALL_TEAMS,
  SORT_DRIVERS_BY_LAST_NAME,
  GET_DRIVER_BY_ID,
} from "../Action-types";
import { base_url } from "../baseURL";
import axios from "axios";

export const orderDrivers = (driversData, orderType) => {
  if(orderType === "desc") {
    return driversData.sort(
      (d1, d2) => (d1.apellido.toLowerCase() < d2.apellido.toLowerCase()) ? 1 : (d1.apellido.toLowerCase() > d2.apellido.toLowerCase()) ? -1 : 0
    )
  } else {
    return driversData.sort(
      (d1, d2) => (d1.apellido.toLowerCase() < d2.apellido.toLowerCase()) ? -1 : (d1.apellido.toLowerCase() > d2.apellido.toLowerCase()) ? 1 : 0
    )
  }
}

export const getAllDrivers = (order) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/drivers`);
    const data = await res.json();
    let orderedData = data;
    
    if(order) {
      orderedData = orderDrivers(data, order)
    }

    dispatch({ type: GET_ALL_DRIVERS, payload: orderedData });
  };
};

export const getAllTeams = () => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/teams`);
    const data = await res.json();
    dispatch({ type: GET_ALL_TEAMS, payload: data });
  };
};

export const getDriversByName = (name) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/drivers?name=${name}`);
    const data = await res.json();
    dispatch({ type: GET_DRIVERS_BY_NAME, payload: data });
  };
};

export const getDriverById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/drivers/${id}`);
    const data = await res.json();
    dispatch({ type: GET_DRIVER_BY_ID, payload: data });
  };
};

export const getDriversByTeam = ({ teamName, order }) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/drivers`);
    const data = await res.json();
    const filteredDrivers = data.filter(driver => driver.teams?.find(team => team.trim() === teamName.trim())); 

    let orderedDrivers = filteredDrivers;
    if(order) {
      orderedDrivers = orderDrivers(filteredDrivers, order)
    }

    dispatch({ type: GET_DRIVERS_BY_TEAM, payload: orderedDrivers });
  };
};

export const getDriversByTeamAndSource = ({ teamName, order, source }) => {
  return async function (dispatch) {
    const fromApi = source === "api";
    const res = await fetch(`${base_url}/drivers`);
    const data = await res.json();
    const filteredDrivers = data.filter(driver => driver.teams?.find(team => team.trim() === teamName.trim())); 
    const teamFilteredDriverBySource = filteredDrivers.filter(driver => driver.fromApi === fromApi);

    let orderedDrivers = teamFilteredDriverBySource;
    if(order) {
      orderedDrivers = orderDrivers(orderedDrivers, order)
    }

    dispatch({ type: GET_DRIVERS_BY_TEAM_AND_SOURCE, payload: orderedDrivers });
  };
};

export const getDriversBySource = ({ order, source }) => {
  return async function (dispatch) {
    const fromApi = source === "api";
    const res = await fetch(`${base_url}/drivers`);
    const data = await res.json();
    const filteredDrivers = data.filter(driver => driver.fromApi === fromApi);

    let orderedDrivers = filteredDrivers;
    if(order) {
      orderedDrivers = orderDrivers(orderedDrivers, order)
    }

    dispatch({ type: GET_DRIVERS_BY_SOURCE, payload: orderedDrivers });
  };
};

export const sortDriversByLastName = (orderType) => {
  return async function (dispatch) {
    dispatch({ type: SORT_DRIVERS_BY_LAST_NAME, payload: orderType });
  };
};

export const createDriver = async (driver) => axios.post(`${base_url}/drivers/`, driver);