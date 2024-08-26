import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  get,
  query,
  set,
  push,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import app from "../../../firebaseConfig";

import { name } from "./slice";

const loadEvents = createAsyncThunk(`${name}/load-events`, async () => {
  const db = getDatabase(app);
  const dbRef = ref(db, "events");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([key, data]) => ({
      id: key,
      ...data,
    }));
  }
});

const loadEvent = createAsyncThunk(
  `${name}/load-event`,
  async ({ eventId, navigate }) => {
    const db = getDatabase(app);
    const eventRef = ref(db, `events/${eventId}`);
    const snapshot = await get(eventRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    navigate("/");
  }
);

const createEvent = createAsyncThunk(
  `${name}/create-event`,
  async ({ values, toastSuccess, toastError, navigate }) => {
    const db = getDatabase(app);
    const eventsRef = ref(db, "events");

    const snapshot = await get(
      query(eventsRef, orderByChild("name"), equalTo(values.name))
    );

    if (snapshot.exists()) {
      toastError("An event with this name already exists!");
      return;
    }

    await set(push(eventsRef), { ...values, tickets: [] });
    toastSuccess("Event created successfully!");
    setTimeout(() => navigate("/"), 3500);

    return { ...values, tickets: [] };
  }
);

const updateEvent = createAsyncThunk(
  `${name}/update-event`,
  async ({ values, eventId, toastSuccess, toastError, navigate }) => {
    const db = getDatabase(app);
    const eventsRef = ref(db, "events");

    const snapshot = await get(
      query(eventsRef, orderByChild("name"), equalTo(values.name))
    );

    if (snapshot.exists() && !snapshot.val()[eventId]) {
      toastError("An event with this name already exists!");
      return;
    }

    await set(ref(db, `events/${eventId}`), values);
    toastSuccess("Event updated successfully!");
    setTimeout(() => navigate(-1), 3500);

    return values;
  }
);

const addTicket = createAsyncThunk(
  `${name}/create-ticket`,
  async ({ eventId, values, toastSuccess, toastError }) => {
    const db = getDatabase(app);

    const eventRef = ref(db, `events/${eventId}`);
    const eventSnapshot = await get(eventRef);

    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.val();
      const tickets = eventData.tickets || [];

      const ticketNumberExists = tickets.some(
        (ticket) => ticket.number === values.ticketNumber
      );

      if (ticketNumberExists) {
        toastError("A ticket with this number already exists in this event!");
        return;
      }

      const updatedTickets = [
        ...tickets,
        {
          number: values.ticketNumber,
          title: values.ticketTitle,
          price: values.ticketPrice,
        },
      ];

      await update(eventRef, { tickets: updatedTickets });
      toastSuccess("Ticket added successfully!");

      return updatedTickets;
    } else {
      toastError("Event not found!");
    }
  }
);

const deleteTicket = createAsyncThunk(
  `${name}/delete-ticket`,
  async ({ eventId, ticketNumber }) => {
    const db = getDatabase(app);
    const eventRef = ref(db, `events/${eventId}`);
    const snapshot = await get(eventRef);

    const tickets = snapshot.val().tickets;
    const updatedTickets = tickets.filter(
      ({ number }) => number !== ticketNumber
    );

    await set(eventRef, { ...snapshot.val(), tickets: updatedTickets });

    return updatedTickets;
  }
);

export {
  loadEvents,
  loadEvent,
  createEvent,
  updateEvent,
  addTicket,
  deleteTicket,
};
