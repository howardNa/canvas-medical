import React from "react";
import SingleAlt from "./SingleAlt.js";

const AltBox = props => {
  const { altList } = props;
  const alternativesArray = [];

  if (altList) {
    altList.forEach((el, i) => {
      alternativesArray.push(
        <SingleAlt
          key={i}
          synonym={el.synonym === "" ? el.name : el.synonym}
          rxcui={el.rxcui}
        />
      );
    });
  }

  return <div className="alt-box">{alternativesArray}</div>;
};

export default AltBox;
