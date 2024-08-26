import { createSlice } from "@reduxjs/toolkit";
import {
  loadEvents,
  loadEvent,
  createEvent,
  updateEvent,
  addTicket,
  deleteTicket,
} from "./actions";

const initialState = {
  events: null,
  currentEvent: null,
};

const { reducer, actions, name } = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
    builder.addCase(loadEvent.fulfilled, (state, action) => {
      state.currentEvent = action.payload;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.events = [...state.events, action.payload];
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.currentEvent = action.payload;
    });
    builder.addCase(addTicket.fulfilled, (state, action) => {
      state.currentEvent = {
        ...state.currentEvent,
        tickets: action.payload,
      };
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.currentEvent = {
        ...state.currentEvent,
        tickets: action.payload,
      };
    });
  },
});

export { reducer, name, actions };
