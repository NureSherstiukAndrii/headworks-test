import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../../store/events/events";
import TicketCreateForm from "./TicketForm";
import TicketsList from "./TicketsList";

import "./index.scss";

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formView, setFormView] = useState(false);
  const [ticketsView, setTicketsView] = useState(false);
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.currentEvent);

  const totalTicket = event?.tickets?.length || 0;

  useEffect(() => {
    dispatch(actions.loadEvent({ eventId, navigate }));

    return () => {
      dispatch(actions.clearEvent());
    };
  }, [eventId]);

  const handleFormView = () => setFormView((prev) => !prev);
  const handleTicketListView = () => setTicketsView((prev) => !prev);

  return !event ? (
    <div>Loading...</div>
  ) : (
    <div className="event">
      <Link to="/">Back to events</Link>
      <h2 className="event-name">{event.name}</h2>

      <div className="event-details">
        <div className="event-detail">
          <span>Category</span>
          <span>{event.category}</span>
        </div>
        <div className="event-detail">
          <span>Contact email</span>
          <span className="break-words">{event.email}</span>
        </div>
        <div className="event-detail">
          <span>Organizer</span>
          <span>{event.organizer}</span>
        </div>
        <div className="event-detail">
          <span>Place</span>
          <span>{event.place}</span>
        </div>

        {event.site && (
          <div className="event-detail">
            <span>Site</span>
            <span>{event.site}</span>
          </div>
        )}
        {event.dressCode && (
          <div className="event-detail">
            <span>Dress code</span>
            <span>{event.dressCode}</span>
          </div>
        )}

        <div className="event-detail">
          <span>Total tickets</span>
          <span>{totalTicket}</span>
        </div>
        <div className="event-detail">
          <span>Date</span>
          <span>{event.date}</span>
        </div>
      </div>

      <button onClick={handleFormView}>Add Ticket</button>
      <button onClick={handleTicketListView}>Open Tickets list</button>

      {formView && <TicketCreateForm closeForm={handleFormView} />}
      {ticketsView && (
        <TicketsList
          ticketsList={event.tickets}
          closeList={handleTicketListView}
        />
      )}

      <Link to={`/event-update/${eventId}`} className="update-link">
        Go to update
      </Link>
    </div>
  );
};

export default Event;
