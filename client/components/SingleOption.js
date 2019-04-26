import React from "react";

const SingleOption = (props) => {

  return (
    <div className="single-option">
        <h5>{props.synonym}</h5>
        <p>{props.rxcui}</p>
        <button onClick={props.listOptions} rxcui={props.rxcui}>Explore</button>
    </div>
  );
};

export default SingleOption;
