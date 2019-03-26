import React, { Component } from "react";

import { items } from "./data";
import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <ul className="item-list">
          {items.map(item => (
            <li className="item">
              <img
                className="item-image"
                alt=""
                src="https://picsum.photos/200/300"
              />
              <span className="item-title">{item.title}</span>
              <span className="item-city">{item.city}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
