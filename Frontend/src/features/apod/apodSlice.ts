import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApodData, fetchApodData } from "./apodAPI";

interface ApodState {
  data: ApodData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialApodState: ApodState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchApod = createAsyncThunk<
  ApodData,
  void,
  { rejectValue: string }
>("apod/fetchApod", async (_, { rejectWithValue }) => {
  try {
    return await fetchApodData();
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || "Failed to fetch APOD data"
    );
  }
});

// Create the APOD slice
const apodSlice = createSlice({
  name: "apod",
  initialState: initialApodState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApod.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchApod.fulfilled,
        (state, action: PayloadAction<ApodData>) => {
          state.status = "succeeded";
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchApod.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export default apodSlice.reducer;
