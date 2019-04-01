import React, { Component } from "react";
import uuidv1 from "uuid/v1";

import { AllItems } from "./components/all-items/all-items";
import { ItemForm } from "./components/item-form/item-form";

import { DB } from "./db/db";
import { DB_NAME } from "./config";
import { getBase64Image } from "./utils";
import { initialItems, FORM_STATES } from "./db/data";
import "./my-app.css";

// init the db
const db = new DB(DB_NAME);

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      form_state: FORM_STATES.ADDING_ITEMS
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
        const oldItem = db.getItem(id);
        newImageFile = oldItem.image;
      } else {
        await getBase64Image(imageFile).then(base64 => {
          newImageFile = base64;
        });
      }

      db.deleteItem(id);
      newItem = { id, city, title, image: newImageFile };
    } else {
      let imageFileBase24 = "";
      await getBase64Image(imageFile).then(base64 => {
        imageFileBase24 = base64;
      });

      newItem = { id: uuidv1(), city, title, image: imageFileBase24 };
    }

    this.setState({ form_state: FORM_STATES.ADDING_ITEMS });

    db.addItem(newItem);
    this.updateState();
  };

  handleDelete = id => {
    console.log(db.getItem(id));
    db.deleteItem(id);
    this.updateState();
  };

  handleEdit = id => {
    const edited_item = db.getItem(id);
    this.setState({
      edited_item,
      form_state: FORM_STATES.EDITING_ITEM
    });
  };

  updateState = () => {
    let allItems = db.get();
    if (!allItems) {
      allItems = initialItems;
      db.update(initialItems);
    }

    this.setState({ items: allItems });
  };

  render() {
    const { items, edited_item, form_state } = this.state;

    return (
      <div className="app">
        {form_state === FORM_STATES.EDITING_ITEM ? (
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
