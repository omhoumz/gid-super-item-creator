import React from "react";

import "./item.css";

export const Item = ({ id, title, city, image, onDelete }) => {
  return (
    <li className="item">
      <img className="item-image" alt="" src={image} />
      <span className="item-title">{title}</span>
      <span className="item-city">{city}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};
