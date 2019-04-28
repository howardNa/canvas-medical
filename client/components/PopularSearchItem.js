import React from "react";

const PopularSearchItem = props => {
  const { term } = props;

  return (
    <div className="popular-item">
      <h4>{term}</h4>
    </div>
  );
};

export default PopularSearchItem;
