export const DB_NAME = "allItemsDb";

export const getDb = key => {
  const ls = localStorage[key];
  return ls ? JSON.parse(ls) : null;
};

export const updateDb = (key, items) => {
  try {
    localStorage[key] = JSON.stringify(items);
  } catch (err) {
    console.log("Something went wrong!!\nSee the Error below.");
    console.log(err);
  }
};

export const getItem = id => {
  const allItems = getDb(DB_NAME);
  return allItems.find(item => item.id === id);
};

export const addItem = item => {
  const oldItems = getDb(DB_NAME);
  updateDb(DB_NAME, [item, ...oldItems]);
};

export const updateItem = item => {
  const oldItems = getDb(DB_NAME);
  const newItems = oldItems.map(oldItem =>
    oldItem.id === item.id ? { ...item } : { ...oldItem }
  );
  updateDb(DB_NAME, newItems);
};

export const deleteItem = id => {
  const oldItems = getDb(DB_NAME);
  const newItems = oldItems.filter(item => item.id !== id);
  updateDb(DB_NAME, newItems);
};
