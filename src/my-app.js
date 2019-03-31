import React, { Component } from "react";
import uuidv1 from "uuid/v1";

import { AllItems } from "./components/all-items/all-items";
import { ItemForm } from "./components/item-form/item-form";

import {
  DB_NAME,
  getDb,
  updateDb,
  deleteItem,
  getItem,
  addItem
} from "./db/db";
import { getBase64Image } from "./utils";
import { initialItems } from "./db/data";
import "./my-app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      form_state: "adding-item"
    };
  }

  componentWillMount = () => {
    this.updateState();
  };

  handleSubmit = async ({ id, title, city, imageFile }) => {
    let newItem = {};

    if (id) {
      let newImageFile = "";
      if (!imageFile) {
        const oldItem = getItem(id);
        newImageFile = oldItem.image;
      } else {
        await getBase64Image(imageFile).then(base64 => {
          newImageFile = base64;
        });
      }

      deleteItem(id);
      newItem = { id, city, title, image: newImageFile };
    } else {
      let imageFileBase24 = "";
      await getBase64Image(imageFile).then(base64 => {
        imageFileBase24 = base64;
      });

      newItem = { id: uuidv1(), city, title, image: imageFileBase24 };
    }

    this.setState({ form_state: "adding-item" });

    addItem(newItem);
    this.updateState();
  };

  handleDelete = id => {
    deleteItem(id);
    this.updateState();
  };

  handleEdit = id => {
    this.setState({
      edited_item: { ...getItem(id) },
      form_state: "editing-item"
    });
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
    const { items, edited_item, form_state } = this.state;

    return (
      <div className="app">
        {form_state === "editing-item" ? (
          <ItemForm
            edit_item={edited_item}
            onSubmit={this.handleSubmit}
            heading="Edit Item:"
            buttonLabel="EDIT ITEM"
          />
        ) : (
          <ItemForm
            onSubmit={this.handleSubmit}
            heading="Add Item:"
            buttonLabel="ADD ITEM"
          />
        )}

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
