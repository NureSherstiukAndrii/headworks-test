import { useEffect } from "react";
import { Form } from "react-final-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../../components/FormField";
import composeValidators from "../../utils/form-validation/composeValidators";
import isRequired from "../../utils/form-validation/isRequired";
import {
  isDateAfterTomorrow,
  minDate,
} from "../../utils/date-validation/date-validation";
import { toastError, toastSuccess } from "../../utils/pop-ups/pop-ups";
import {
  createEvent,
  loadEvent,
  updateEvent,
} from "../../store/events/actions";

import "./index.scss";

const EventForm = ({ isUpdate }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.events.currentEvent);

  useEffect(() => {
    if (isUpdate && eventId) {
      dispatch(loadEvent({ eventId }));
    }
  }, [eventId, isUpdate]);

  const handleSubmitForm = async (values) => {
    if (isUpdate) {
      dispatch(
        updateEvent({ values, eventId, toastSuccess, toastError, navigate })
      );
    } else {
      dispatch(createEvent({ values, toastSuccess, toastError, navigate }));
    }
  };

  if (isUpdate && !eventData) {
    return <div style={{ color: "black" }}>Loading...</div>;
  }

  return (
    <Form
      onSubmit={handleSubmitForm}
      initialValues={eventData}
      render={({ handleSubmit }) => (
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="event-form">
            <Link to="/" style={{ marginBottom: 20 }}>
              Go to events
            </Link>
            <h1 style={{ marginBottom: 20 }}>
              {isUpdate ? "Update Event" : "Create Event"}
            </h1>

            <FormField
              name="name"
              type="text"
              placeholder="Name"
              validators={isRequired}
            />
            <FormField
              name="category"
              type="text"
              placeholder="Category"
              validators={isRequired}
            />
            <FormField
              name="place"
              type="text"
              placeholder="Place"
              validators={isRequired}
            />
            <FormField
              name="organizer"
              type="text"
              placeholder="Organizer"
              validators={isRequired}
            />
            <FormField name="site" type="text" placeholder="Site (optional)" />
            <FormField
              name="email"
              type="text"
              placeholder="Contact Email"
              validators={isRequired}
            />
            <FormField
              name="dressCode"
              type="text"
              placeholder="Dress Code (optional)"
            />
            <FormField
              name="date"
              type="date"
              placeholder="Date"
              lang="fr-CA"
              validators={composeValidators(isRequired, isDateAfterTomorrow)}
              min={minDate()}
            />
            <button type="submit" className="event-form__button">
              {isUpdate ? "Update Event" : "Create Event"}
            </button>
          </form>
        </div>
      )}
    />
  );
};

EventForm.propTypes = {
  isUpdate: PropTypes.bool,
};

export default EventForm;
