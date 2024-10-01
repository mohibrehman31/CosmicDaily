import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MarsWeatherData } from "../../types";
import { fetchMarsWeatherData } from "./marsWeatherAPI";

// Define the state type
interface MarsWeatherState {
  data: MarsWeatherData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MarsWeatherState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchMarsWeather = createAsyncThunk<
  MarsWeatherData,
  void,
  { rejectValue: string }
>("marsWeather/fetchMarsWeather", async (_, { rejectWithValue }) => {
  try {
    return await fetchMarsWeatherData();
  } catch (error) {
    return rejectWithValue((error as Error).message || "An error occurred");
  }
});

const marsWeatherSlice = createSlice({
  name: "marsWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarsWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchMarsWeather.fulfilled,
        (state, action: PayloadAction<MarsWeatherData>) => {
          state.status = "succeeded";
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchMarsWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export default marsWeatherSlice.reducer;
