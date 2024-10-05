import { combineReducers } from "@reduxjs/toolkit";
import marsWeatherReducer from "../features/marsWeather/marsWeatherSlice";
import apodReducer from "../features/apod/apodSlice";
import asteroidReducer from "../features/asteroid/asteroidSlice";

const rootReducer = combineReducers({
  marsWeather: marsWeatherReducer,
  apod: apodReducer,
  asteroid: asteroidReducer,
});

export default rootReducer;
