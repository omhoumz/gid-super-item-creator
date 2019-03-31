import React, { Component } from "react";
import uuidv1 from "uuid/v1";

import { AllItems } from "./components/all-items/all-items";
import { ItemForm } from "./components/item-form/item-form";

import {
  DB_NAME,
  getDb,
  updateDb,
  deleteItem
  // getItem,
  // saveItem
} from "./db/db";
import { getBase64Image } from "./utils";
import { initialItems } from "./db/data";
import "./app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentWillMount = () => {
    this.updateState();
  };

  handleSubmit = async ({ title, city, imageFile }) => {
    await getBase64Image(imageFile).then(base64 => {
      const newItem = { id: uuidv1(), city, title, image: base64 };
      const newItems = [newItem, ...getDb(DB_NAME)];

      updateDb(DB_NAME, newItems);
    });

    this.setState({ items: getDb(DB_NAME) });
  };

  handleDelete = id => {
    deleteItem(id);
    this.updateState();
  };

  handleEdit = id => {
    this.setState({
      edited_item: { ...getItem(id) }
    });
    console.log(getItem(id));
  };

  updateState = () => {
    let allItems = getDb(DB_NAME);
    if (!allItems) {
      allItems = initialItems;
      updateDb(DB_NAME, initialItems);
    }

    this.setState({ items: allItems });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="app">
        <ItemForm
          onSubmit={this.handleSubmit}
          heading="Edit Item"
          buttonLabel="ADD ITEM"
        />
        <AllItems
          items={items}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default App;
