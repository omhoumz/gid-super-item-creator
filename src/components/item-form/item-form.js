import React from "react";

import { CITIES_LIST } from "../../db/data";
import "./item-form.css";

export class ItemForm extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: "",
      city: ""
    };

    this.fileInput = React.createRef();
  }

  onChange = event => {
    const key = event.target.name;
    const value = event.target.type !== "file" && event.target.value;

    this.setState({ [key]: value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { title, city } = this.state;
    const imageFile = this.fileInput.current.files[0];

    if (title === "" || city === "" || !imageFile) {
      alert("Fill all fields!");
      return;
    }

    event.target.title.value = "";
    event.target.city.value = "";
    event.target.image.value = "";

    this.setState({ title: "", city: "" });

    this.props.onSubmit({ title, city, imageFile });
  };

  render() {
    const { buttonLabel, heading } = this.props;

    const { title, city } = this.state;

    return (
      <form className="item-form" onSubmit={this.onSubmit}>
        <h2 className="heading">{heading}</h2>
        <div className="data-inputs">
          <label htmlFor="image">
            Image:
            <input type="file" name="image" ref={this.fileInput} />
          </label>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
            />
          </label>
          <label htmlFor="city">
            City:
            <select name="city" value={city} onChange={this.onChange}>
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
        <button type="submit" className="btn blue">
          {buttonLabel}
        </button>
      </form>
    );
  }
}
