import React from "react";
import PopularSearchItem from './PopularSearchItem.js';

const PopularSearchBox = (props) => {
  const { popularSearches } = props;
  let top5 = [];

  if (popularSearches) {
    const sortedPopularSearches = Object.entries(popularSearches).sort((a, b) => {
      return b[1] - a[1];
    })
    const top5Inputs = sortedPopularSearches.slice(0, 5).map(el => {
      return el[0];
    });
    top5Inputs.forEach((el, i) => {
      top5.push(<PopularSearchItem key={i} term={el} />)
    })
  }

  return (
    <div className="popular-box">
      {top5}
    </div>
  );
};

export default PopularSearchBox;
