import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import arrowDown from "../../assets/arrow-down.png";

import "./index.scss";

const Filter = ({ filterParagraph, children }) => {
  const [viewFilter, setViewFilter] = useState(false);

  const changeFilterView = () => {
    setViewFilter((prev) => !prev);
  };

  return (
    <>
      <div className="filter-item">
        <span className="filter-item__title">{filterParagraph}</span>
        <CSSTransition in={viewFilter} timeout={300} classNames="filter-arrow">
          <img src={arrowDown} onClick={changeFilterView} alt="arrow-down" />
        </CSSTransition>
      </div>

      <CSSTransition
        in={viewFilter}
        timeout={300}
        classNames="filter-animation"
        unmountOnExit
      >
        <div className="filter-item__options">{children}</div>
      </CSSTransition>
    </>
  );
};

Filter.propTypes = {
  filterParagraph: PropTypes.string,
  children: PropTypes.node,
};

export default Filter;
