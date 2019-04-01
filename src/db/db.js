export class DB {
  constructor(db_name) {
    this.db_name = db_name;
  }
  get = () => {
    const localDb = localStorage[this.db_name];
    return localDb ? JSON.parse(localDb) : null;
  };

  update = items => {
    try {
      localStorage[this.db_name] = JSON.stringify(items);
    } catch (err) {
      console.log("Something went wrong!!\nSee the Error below.");
      console.log(err);
    }
  };

  getItem = id => {
    const allItems = this.get();
    return allItems.find(item => item.id === id);
  };

  addItem = item => {
    const oldItems = this.get();
    this.update([item, ...oldItems]);
  };

  updateItem = item => {
    const oldItems = this.get();
    const newItems = oldItems.map(oldItem =>
      oldItem.id === item.id ? { ...item } : { ...oldItem }
    );
    updateDb(newItems);
  };

  deleteItem = id => {
    const oldItems = this.get();
    const newItems = oldItems.filter(item => item.id !== id);
    this.update(newItems);
  };
}
