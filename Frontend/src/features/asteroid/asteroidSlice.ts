import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAsteroidData } from "./asteroidAPI";
import { AsteroidData } from "../../types/types";
interface AsteroidState {
  data: AsteroidData[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialAsteroidState: AsteroidState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchAsteroids = createAsyncThunk<
  AsteroidData[],
  void,
  { rejectValue: string }
>("asteroid/fetchAsteroids", async (_, { rejectWithValue }) => {
  try {
    return await fetchAsteroidData();
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || "Failed to fetch asteroid data"
    );
  }
});

const asteroidSlice = createSlice({
  name: "asteroid",
  initialState: initialAsteroidState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsteroids.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAsteroids.fulfilled,
        (state, action: PayloadAction<AsteroidData[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAsteroids.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export default asteroidSlice.reducer;
