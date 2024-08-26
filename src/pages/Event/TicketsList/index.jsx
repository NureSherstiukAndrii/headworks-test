import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteTicket } from "../../../store/events/actions";

import "./index.scss";

const TicketsList = ({ ticketsList, closeList }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const handleTicketDelete = (ticketNumber) => {
    dispatch(deleteTicket({ eventId, ticketNumber }));
  };

  return (
    <div className="tickets">
      <span onClick={closeList} className="tickets-close">
        X
      </span>
      <h2>Tickets List</h2>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ticketsList?.map(({ title, number, price }) => (
            <tr key={number}>
              <td>{number}</td>
              <td>{title}</td>
              <td>{price}</td>
              <td>
                <button
                  className="delete-ticket"
                  onClick={() => handleTicketDelete(number)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TicketsList.propTypes = {
  ticketsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      number: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  closeList: PropTypes.func,
};

export default TicketsList;
