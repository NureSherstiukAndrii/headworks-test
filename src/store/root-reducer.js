import { combineReducers } from "@reduxjs/toolkit";
import { reducer as eventReducer } from "./events/events";

const rootReducer = combineReducers({
  events: eventReducer,
});

export { rootReducer };
