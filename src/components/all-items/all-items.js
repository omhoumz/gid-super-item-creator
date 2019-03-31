import React from "react";

import { Item } from "./item/item";
import "./all-items.css";

export const AllItems = ({ items, onDelete, onEdit }) => {
  return (
    <React.Fragment>
      <h2 className="heading">All Items</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <Item
            id={item.id}
            title={item.title}
            image={item.image}
            city={item.city}
            key={index}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};
