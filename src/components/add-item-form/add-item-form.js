import React from "react";

import { CITIES_LIST } from "../../data";
import "./add-item-form.css";

export class AddItemForm extends React.PureComponent {
  onSubmit = event => {
    event.preventDefault();
    const title = event.target[0].value;
    const city = event.target[1].value;

    if (title === "" || city === "") {
      return;
    }

    event.target[0].value = "";

    this.props.onSubmit({ title, city });
  };

  render() {
    return (
      <form className="add-item-form" onSubmit={this.onSubmit}>
        <h2 className="heading">Add an item:</h2>
        <div className="data-inputs">
          <label htmlFor="title">
            Title:
            <input type="text" id="title" />
          </label>
          <label htmlFor="city">
            City:
            <select id="city">
              {CITIES_LIST.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="add-item">
          ADD ITEM
        </button>
      </form>
    );
  }
}
