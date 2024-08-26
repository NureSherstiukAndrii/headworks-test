import { Form, Field } from "react-final-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../../../components/FormField";
import isRequired from "../../../utils/form-validation/isRequired";
import isNumber from "../../../utils/form-validation/isNumber";
import composeValidators from "../../../utils/form-validation/composeValidators";
import { toastError, toastSuccess } from "../../../utils/pop-ups/pop-ups";
import { addTicket } from "../../../store/events/actions";

import "./index.scss";

const TicketCreateForm = ({ closeForm }) => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const handleCreateTicket = async (values) => {
    dispatch(addTicket({ eventId, values, toastSuccess, toastError }));
    closeForm();
  };

  return (
    <>
      <h1>Add Ticket to Event</h1>
      <Form
        onSubmit={handleCreateTicket}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="ticket-form">
            <span onClick={closeForm} className="ticket-form__close">
              X
            </span>
            <FormField
              name="ticketNumber"
              type="text"
              placeholder="Ticket Number"
              validators={composeValidators(isRequired, isNumber)}
            />
            <Field name="ticketTitle" component="select" validate={isRequired}>
              <option value="" disabled>
                Select ticket type
              </option>
              <option value="standard">standard</option>
              <option value="vip">vip</option>
            </Field>
            <FormField
              name="ticketPrice"
              type="text"
              placeholder="Ticket Price"
              validators={composeValidators(isRequired, isNumber)}
            />

            <button type="submit">Add Ticket</button>
          </form>
        )}
      />
    </>
  );
};

TicketCreateForm.propTypes = {
  closeForm: PropTypes.func,
};

export default TicketCreateForm;
