import React from "react";

import { Item } from "./item/item";
import "./all-items.css";

export const AllItems = ({ items }) => {
  return (
    <React.Fragment>
      <h2 className="heading">All Items</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <Item title={item.title} city={item.city} key={index} />
        ))}
      </ul>
    </React.Fragment>
  );
};
