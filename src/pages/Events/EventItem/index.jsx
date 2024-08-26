import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const EventItem = ({ id, name, date, ticketsCount = 0 }) => (
  <div className="event-item ">
    <span className="event-item__name">{name}</span>
    <span className="event-item__date">Start date - {date}</span>
    <span className="event-item__tickets">Total tickets - {ticketsCount}</span>
    <Link to={`/event/${id}`} className="event-item__details">
      See details
    </Link>
  </div>
);

EventItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  ticketsCount: PropTypes.number,
};

export default EventItem;
