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

  componentDidUpdate = () => {
    // This is a controlled component with the capacity to set initial values
    const { edit_item } = this.props;
    const { title, city } = this.state;

    const newTitle = title || (edit_item && edit_item.title);
    const newCity = city || (edit_item && edit_item.city);

    this.setState({
      title: newTitle || "",
      city: newCity || ""
    });
  };

  onChange = event => {
    const key = event.target.name;
    // files are readonly
    const value = event.target.type !== "file" && event.target.value;

    this.setState({ [key]: value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { edit_item } = this.props;
    const id = edit_item && edit_item.id;

    const { title, city } = this.state;
    const imageFile = this.fileInput.current.files[0];

    if (title === "" || city === "" || (!id && !imageFile)) {
      alert("Fill all fields!");
      return;
    }

    event.target.title.value = "";
    event.target.city.value = "";
    event.target.image.value = "";

    this.setState({ title: "", city: "" });

    this.props.onSubmit({ id: id || null, title, city, imageFile });
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
