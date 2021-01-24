export const DBConfig = {
  name: "bookshop",
  version: 2,
  objectStoresMeta: [
    {
      store: "books",
      storeConfig: {
        name: "id",
        keyPath: "id",
        autoIncrement: false,
        options: { unique: true },
      },
      storeSchema: [
        { name: "key", keypath: "key", options: { unique: true } },
        { name: "bookId", keypath: "bookId", options: { unique: true } },
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "authors", keypath: "authors", options: { unique: false } },
        {
          name: "average_rating",
          keypath: "average_rating",
          options: { unique: false },
        },
        { name: "isbn", keypath: "isbn", options: { unique: false } },
        {
          name: "language_code",
          keypath: "language_code",
          options: { unique: false },
        },
        {
          name: "ratings_count",
          keypath: "ratings_count",
          options: { unique: false },
        },
        {
          name: "price",
          keypath: "price",
          options: { unique: false },
        },
      ],
    },
    {
      store: "users",
      storeConfig: { keyPath: "userId", autoIncrement: true },
      storeSchema: [
        { name: "email", keypath: "email", options: { unique: false } },
        { name: "password", keypath: "password", options: { unique: false } },
        { name: "cart", keypath: "cart", options: { unique: false } },
        { name: "orders", keypath: "orders", options: { unique: false } },
      ],
    },
  ],
};
