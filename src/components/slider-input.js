import React from "react";
import { numberWithCommas } from "../utils/config";

function SliderInput({ title, state, min, max, onChange, labelMin, labelMax }) {
  return (
    <React.Fragment>
      <span className="title value-label">{title}</span>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />
        <div className="labels">
          <label>{labelMin ?? min}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? max}</label>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SliderInput;
