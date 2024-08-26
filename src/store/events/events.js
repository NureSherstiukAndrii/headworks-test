import {
  loadEvents,
  loadEvent,
  createEvent,
  updateEvent,
  addTicket,
  deleteTicket,
} from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadEvents,
  loadEvent,
  createEvent,
  updateEvent,
  addTicket,
  deleteTicket,
};

export { allActions as actions, reducer };
