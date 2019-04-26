import React from "react";

const SingleAlt = (props) => {

  return (
    <div className="single-alt">
        <h5>{props.synonym}</h5>
        <p>{props.rxcui}</p>
    </div>
  );
};

export default SingleAlt;