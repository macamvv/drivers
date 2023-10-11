import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { mainService } from "./mainService";

const initialState = {
  teams: [],
  drivers: [],
  DriverAdded: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getTeams = createAsyncThunk("teams/get-teams", async (thunkAPI) => {
  try {
    return await mainService.getTeams();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDrivers = createAsyncThunk("drivers/get-drivers", async (thunkAPI) => {
  try {
    return await mainService.getDrivers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDriverById = createAsyncThunk("drivers/get-by-id", async (driverId, thunkAPI) => {
  try {
    return await mainService.getDriverById(driverId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDriversByName = createAsyncThunk("drivers/get-by-name", async (data, thunkAPI) => {
  try {
    return await mainService.getDriversByName(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDriversByTeam = createAsyncThunk("drivers/get-drivers-by-team", async (teamName, thunkAPI) => {
  try {
    const drivers = await mainService.getDrivers();

    return drivers.filter(driver => driver.teams?.find(team => team === teamName));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getDriversByTeamAndSource = createAsyncThunk("drivers/get-drivers-by-team-and-source", async ({ team: teamName, source }, thunkAPI) => {
  try {
    const fromApi = source === "api";
    const drivers = await mainService.getDrivers();
    const teamFilteredDriver = drivers.filter(driver => driver.teams.find(team => team === teamName));
    return teamFilteredDriver.filter(driver => driver.fromApi === fromApi);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const getDriversBySource = createAsyncThunk("drivers/get-drivers-by-source", async (source, thunkAPI) => {
  try {
    const drivers = await mainService.getDrivers();
    const fromApi = source === "api";
    return drivers.filter(driver => driver.fromApi === fromApi);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const createDriver = createAsyncThunk("create-driver", async (data, thunkAPI) => {
  try {
    return await mainService.createDriver(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

//SORT BY LASTNAME

export const sortDriversByLastName = createAction("sort-driver-by-last-name");
//REDUCER
export const mainSlice = createSlice({
  name: "mainData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET TEAMS
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Teams Received";
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the teams";
        state.teams = [];
      })

      // GET DRIVERS
      .addCase(getDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers Received";
        state.drivers = action.payload; //reducer GUARDA LA DATA en el estado global
      })
      .addCase(getDrivers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers";
        state.drivers = [];
      })

      // GET DRIVERS BY NAME
      .addCase(getDriversByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriversByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers by Name Received";
        state.drivers = action.payload;
      })
      .addCase(getDriversByName.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers by name";
        state.drivers = [];
      })
      // GET DRIVER BY ID

      .addCase(getDriverById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriverById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers by Name Received";
        state.drivers = action.payload;
      })
      .addCase(getDriverById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers by name";
        state.drivers = [];
      })

      //GET DRIVERS BY TEAM
      .addCase(getDriversByTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriversByTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers by Name Received";
        state.drivers = action.payload;
      })
      .addCase(getDriversByTeam.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers by name";
        state.drivers = [];
      })

      .addCase(getDriversBySource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriversBySource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers by Name Received";
        state.drivers = action.payload;
      })
      .addCase(getDriversBySource.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers by name";
        state.drivers = [];
      })

      .addCase(getDriversByTeamAndSource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriversByTeamAndSource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Drivers by Name Received";
        state.drivers = action.payload;
      })
      .addCase(getDriversByTeamAndSource.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Error getting the drivers by name";
        state.drivers = [];
      })

          .addCase(createDriver.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createDriver.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Driver created";
            state.drivers.push(action.payload);
            state.driverAdded = true
          })
          .addCase(createDriver.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.driverAdded = false;
            state.message = "Error creating the driver";
          })
//SORT DRIVERS BY NAME
          .addCase(sortDriversByLastName, (state, action) => {
            if(action.payload === "desc") {
              state.drivers = state.drivers.sort(
                (d1, d2) => (d1.apellido.toLowerCase() < d2.apellido.toLowerCase()) ? 1 : (d1.apellido.toLowerCase() > d2.apellido.toLowerCase()) ? -1 : 0
              )
            } else {
              state.drivers = state.drivers.sort(
                (d1, d2) => (d1.apellido.toLowerCase() < d2.apellido.toLowerCase()) ? -1 : (d1.apellido.toLowerCase() > d2.apellido.toLowerCase()) ? 1 : 0
              )
            }
          })
      }
    })
