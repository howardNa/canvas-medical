import React from "react";

const PopularSearchItem = (props) => {
    const { term } = props;

    console.log('DOOOOOOOOOOOo')
    console.log('dddd', term)

  return (
    <div className="popular-item">
        <h4>{term}</h4>
    </div>
  );
};

export default PopularSearchItem;
