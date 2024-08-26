import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Events from "./pages/Events";
import Event from "./pages/Event";
import EventForm from "./pages/EventForm";

import "./styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/event-create" element={<EventForm isUpdate={false} />} />
      <Route path="/event-update/:eventId" element={<EventForm isUpdate />} />
      <Route path="/event/:eventId" element={<Event />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default App;
