import { combineReducers } from "@reduxjs/toolkit";
import marsWeatherReducer from "../features/marsWeather/marsWeatherSlice";
import apodReducer from "../features/apod/apodSlice";

const rootReducer = combineReducers({
  marsWeather: marsWeatherReducer,
  apod: apodReducer,
});

export default rootReducer;
