import React from "react";

import PopularSearchItem from './PopularSearchItem.js';

const PopularSearchBox = (props) => {
  const { popularSearches } = props;
  console.log('heyy: ', popularSearches)

  let top5 = [];
  if (popularSearches) {
    console.log('popularSearches: ', popularSearches)
    const sortedPopularSearches = Object.entries(popularSearches).sort((a, b) => {
      return b[1] - a[1];
    })
    const top5Inputs = sortedPopularSearches.slice(0, 5).map(el => {
      console.log('iiii', el[0])
      return el[0];
    });
    top5Inputs.forEach((el, i) => {
      top5.push(<PopularSearchItem key={i} term={el} />)
    })
    console.log('top 5: ', top5Inputs)
  }

  
  return (
    <div className="popular-box">
      {top5}
    </div>
  );
};

export default PopularSearchBox;
