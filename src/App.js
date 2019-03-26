import React, { Component } from "react";

import { AllItems } from "./components/all-items/all-items";
import { AddItemForm } from "./components/add-item-form/add-item-form";

import { initialItems } from "./data";
import "./app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentWillMount = () => {
    this.setState({
      items: initialItems
    });
  };

  handleSubmit = ({ title, city }) => {
    const newItem = { city, title };
    const newItems = [newItem, ...this.state.items];

    this.setState({ items: newItems });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="app">
        <AddItemForm onSubmit={this.handleSubmit} />
        <AllItems items={items} />
      </div>
    );
  }
}

export default App;
