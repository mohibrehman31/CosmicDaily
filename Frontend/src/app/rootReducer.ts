import { combineReducers } from "@reduxjs/toolkit";
import marsWeatherReducer from "../features/marsWeather/marsWeatherSlice";
import apodReducer from "../features/apod/apodSlice";
import asteroidReducer from "../features/asteroids/asteroidSlice";

const rootReducer = combineReducers({
  marsWeather: marsWeatherReducer,
  apod: apodReducer,
});

export default rootReducer;
