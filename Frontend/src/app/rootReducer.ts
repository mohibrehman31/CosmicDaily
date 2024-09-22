import { combineReducers } from "@reduxjs/toolkit";
import marsWeatherReducer from "../features/marsWeather/marsWeatherSlice";
// import userReducer from "../features/user/userSlice";

const rootReducer = combineReducers({
  marsWeather: marsWeatherReducer,
  // user: userReducer,
  // Add other reducers here
});

export default rootReducer;
