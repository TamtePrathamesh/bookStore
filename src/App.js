import React, { useEffect } from "react";
import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "./store/";
import Routes from "./Routes";

import "./App.css";

initDB(DBConfig);

const App = () => {
  const { add } = useIndexedDB("books");

  useEffect(() => {
    try {
      let request = window.indexedDB.open("bookshop", 2),
        db,
        tx;

      request.onerror = function (e) {
        console.log("db doesnt exists", e);
      };
      request.onsuccess = function (e) {
        console.log("db opened", request.result);
        db = request.result;
        tx = db.transaction("books", "readonly").objectStore("books");

        let q1 = tx.get(1);

        q1.onsuccess = (e) => {
          console.log("data already exists", q1.result);
          if (!q1.result) {
            console.log("fetching data");
            fetch(
              "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
            )
              .then((res) => res.json())
              .then((res) => {
                res.slice(0, 100).map((data) =>
                  add({ id: data.bookID, key: data.bookID, ...data }).then(
                    (error) => {
                      console.log(error);
                      return "";
                    }
                  )
                );
              });
          }
        };

        q1.onerror = (e) => {};

        db.onerror = (e) => {
          console.log("db error", e);
        };

        tx.oncomplete = () => {
          db.close();
        };
      };
    } catch (error) {}
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
