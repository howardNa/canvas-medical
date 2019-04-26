import React from "react";

const PopularSearchItem = (props) => {
    const { term } = props;

    console.log('DOOOOOOOOOOOo')
    console.log('dddd', term)

  return (
    <div className="popular-item">
        <h5>{term}</h5>
    </div>
  );
};

export default PopularSearchItem;
