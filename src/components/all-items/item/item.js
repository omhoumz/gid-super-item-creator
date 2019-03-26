import React from "react";

import "./item.css";

export const Item = ({ title, city }) => {
  return (
    <li className="item">
      <img className="item-image" alt="" src="https://picsum.photos/200/300" />
      <span className="item-title">{title}</span>
      <span className="item-city">{city}</span>
    </li>
  );
};
