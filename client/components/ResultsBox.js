import React from "react";
import SingleOption from "./SingleOption.js";

const ResultsBox = props => {
  const { searchResponse } = props;
  let results = [];
  const createOptions = [];

  if (searchResponse) {
    searchResponse.forEach(el => {
      if (el.conceptProperties) {
        results = results.concat(el.conceptProperties);
      }
    });
    results.forEach((res, i) => {
      createOptions.push(
        <SingleOption
          key={i}
          synonym={res.synonym === '' ? res.name : res.synonym}
          name={res.name}
          rxcui={res.rxcui}
          listOptions={props.listOptions}
        />
      );
    });
  }

  return <div className="results-box">{createOptions}</div>;
};

export default ResultsBox;
