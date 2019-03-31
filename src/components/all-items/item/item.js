import React from "react";

import "./item.css";

export const Item = ({ id, title, city, image, onDelete, onEdit }) => {
  return (
    <li className="item">
      <img className="item-image" alt="" src={image} />
      <span className="item-title">{title}</span>
      <span className="item-city">{city}</span>
      <button onClick={() => onEdit(id)} className="btn sm">
        Edit
      </button>
      <button onClick={() => onDelete(id)} className="btn sm">
        Delete
      </button>
    </li>
  );
};
