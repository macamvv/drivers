import {
  GET_ALL_DRIVERS,
  GET_ALL_TEAMS,
  GET_DRIVERS_BY_NAME,
  GET_DRIVERS_BY_TEAM_AND_SOURCE,
  GET_DRIVERS_BY_TEAM,
  GET_DRIVERS_BY_SOURCE,
  SORT_DRIVERS_BY_LAST_NAME,
  GET_DRIVER_BY_ID,
} from "./Action-types";

const initialState = {
  drivers: [],
  teams: [],
}

const orderDrivers = (driversData, orderType) => {
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

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DRIVERS:
      return {
        ...state,
        drivers: payload,
      };
    case GET_DRIVERS_BY_NAME:
      return {
        ...state,
        drivers: payload,
      };
    case GET_DRIVERS_BY_TEAM_AND_SOURCE:
      return {
        ...state,
        drivers: payload,
      };
    case GET_DRIVERS_BY_SOURCE:
      return {
        ...state,
        drivers: payload,
      };
    case GET_DRIVERS_BY_TEAM:
      return {
        ...state,
        drivers: payload,
      };
    case SORT_DRIVERS_BY_LAST_NAME:
      return {
        ...state,
        drivers: [...orderDrivers(state.drivers, payload)],
      };
    case GET_DRIVER_BY_ID:
      return {
        ...state,
        drivers: [payload],
      };
    case GET_ALL_TEAMS:
      return {
        ...state,
        teams: payload,
      };
      
    default:
      return { ...state };
  }
};

export default Reducer;