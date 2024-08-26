import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EventItem from "./EventItem";
import EventsFilter from "./EventFilters";
import formatDate from "../../utils/date-helper/formatDate";
import { loadEvents } from "../../store/events/actions";

import "./index.scss";

const Events = () => {
  const [sortingValue, setSortingValue] = useState("");
  const [filteringValues, setFilteringValues] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  const handleSortingValue = (newValue) => {
    setSortingValue(newValue);
  };

  const handleFilteringValue = (newValues) => {
    setFilteringValues(newValues);
  };

  const resetAllFilters = () => {
    setSortingValue("");
    setFilteringValues(null);
  };

  const filteredEventList = useMemo(() => {
    if (!events) return [];

    const sortingOptions = {
      fromA: (a, b) => a.name.localeCompare(b.name),
      fromZ: (a, b) => b.name.localeCompare(a.name),
      latest: (a, b) => new Date(b.date) - new Date(a.date),
      oldest: (a, b) => new Date(a.date) - new Date(b.date),
    };

    let filteredEvents = [...events];

    if (filteringValues) {
      const { ticketsRange, dateRange } = filteringValues;

      if (ticketsRange) {
        const [minTickets, maxTickets] = ticketsRange;

        filteredEvents = filteredEvents.filter(({ tickets }) => {
          const ticketsCount = tickets?.length || 0;
          return ticketsCount >= minTickets && ticketsCount <= maxTickets;
        });
      }

      if (dateRange) {
        const now = new Date();
        const oneMonthLater = new Date(now.setMonth(now.getMonth() + 1));
        const sixMonthsLater = new Date(now.setMonth(now.getMonth() + 5));

        const dateComparisons = {
          OneMonth: (eventDate) => eventDate <= oneMonthLater,
          twoSixMonth: (eventDate) =>
            eventDate > oneMonthLater && eventDate <= sixMonthsLater,
          moreSixMonth: (eventDate) => eventDate > sixMonthsLater,
        };

        filteredEvents = filteredEvents.filter(({ date }) => {
          const eventDate = new Date(date);
          return dateComparisons[dateRange]?.(eventDate) ?? true;
        });
      }
    }

    if (!sortingValue) {
      return filteredEvents;
    }

    return filteredEvents.sort(sortingOptions?.[sortingValue]);
  }, [events, sortingValue, filteringValues]);

  return (
    <>
      <Link to="/event-create" className="create-link">
        CREATE EVENT
      </Link>

      {!events ? (
        <div style={{ color: "black" }}>Loading...</div>
      ) : (
        <div className="events">
          <EventsFilter
            handleSortValue={handleSortingValue}
            handleFilteringValue={handleFilteringValue}
            resetAllFilters={resetAllFilters}
          />
          <div className="events-list">
            {filteredEventList?.map(({ id, name, tickets, date }) => (
              <EventItem
                key={id}
                id={id}
                name={name}
                ticketsCount={tickets?.length}
                date={formatDate(date)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
