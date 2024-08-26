import { useState } from "react";
import { Field, Form } from "react-final-form";
import Slider from "rc-slider";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Select from "../../../components/Select";
import Filter from "../../../components/Filter";
import { SORTING_OPTIONS } from "./constants";

import "./index.scss";
import "rc-slider/assets/index.css";

const EventsFilter = ({
  handleSortValue,
  handleFilteringValue,
  resetAllFilters,
}) => {
  const allEvents = useSelector((state) => state.events.events);
  const maxTicketsValue = allEvents?.reduce((acc, { tickets }) => {
    return Math.max(acc, tickets?.length || 0);
  }, 0);
  const [sliderValue, setSliderValue] = useState([0, maxTicketsValue]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleFiltersSubmit = (values) => {
    handleFilteringValue({ ...values, ticketsRange: sliderValue });
  };

  const handleSelect = ({ target }) => {
    handleSortValue(target.value);
  };

  return (
    <div className="events-filter">
      <h2 className="events-filter__title">Events filter</h2>
      <Select name="sort" options={SORTING_OPTIONS} onChange={handleSelect} />
      <Form
        onSubmit={handleFiltersSubmit}
        render={({ handleSubmit }) => (
          <form className="filters-list" onSubmit={handleSubmit}>
            <div className="tickets-filter">
              <h2 className="tickets-filter__title">Tickets</h2>
              <span className="tickets-filter__range">
                Current Range: {sliderValue[0]} - {sliderValue[1]}
              </span>
              <Slider
                range
                min={0}
                max={maxTicketsValue}
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </div>

            <Filter filterParagraph="Date">
              <label htmlFor="dateRange">
                <Field
                  name="dateRange"
                  component="input"
                  type="radio"
                  value="OneMonth"
                />
                up to a month
              </label>
              <label htmlFor="dateRange">
                <Field
                  name="dateRange"
                  component="input"
                  type="radio"
                  value="twoSixMonth"
                />
                in 1 to 6 months
              </label>
              <label htmlFor="dateRange">
                <Field
                  name="dateRange"
                  component="input"
                  type="radio"
                  value="moreSixMonth"
                />
                more six month
              </label>
            </Filter>

            <button type="submit">Apply filters</button>
            <button type="reset" onClick={resetAllFilters}>
              Reset filters
            </button>
          </form>
        )}
      />
    </div>
  );
};

EventsFilter.propTypes = {
  handleSortValue: PropTypes.func,
  handleFilteringValue: PropTypes.func,
  resetAllFilters: PropTypes.func,
};

export default EventsFilter;
