import React from "react";

const SingleOption = props => {
  return (
    <div className="single-option">
      <p onClick={props.listOptions} rxcui={props.rxcui}>
        {props.synonym}
      </p>
    </div>
  );
};

export default SingleOption;
