import React from "react";

import { CITIES_LIST } from "../../data";
import "./add-item-form.css";

export class AddItemForm extends React.PureComponent {
  onSubmit = event => {
    event.preventDefault();
    const title = event.target.title.value;
    const city = event.target.city.value;
    const image = event.target.image.value;

    if (title === "" || city === "" || image === "") {
      alert("Fill all fields!");
      return;
    }

    event.target.title.value = "";
    event.target.city.value = "";
    event.target.image.value = "";

    this.props.onSubmit({ title, city });
  };

  render() {
    return (
      <form className="add-item-form" onSubmit={this.onSubmit}>
        <h2 className="heading">Add an item:</h2>
        <div className="data-inputs">
          <label htmlFor="image">
            Image:
            <input type="file" name="image" />
          </label>
          <label htmlFor="title">
            Title:
            <input type="text" name="title" />
          </label>
          <label htmlFor="city">
            City:
            <select name="city" defaultValue="">
              <option value="" disabled>
                Choose a city
              </option>
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
