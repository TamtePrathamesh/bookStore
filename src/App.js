import React, { useEffect, useState } from "react";
import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "./store/";
import Routes from "./Routes";

import "./App.css";

initDB(DBConfig);

const App = () => {
  const { add } = useIndexedDB("books");
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    try {
     
         
            fetch(
              "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
            )
              .then((res) => res.json())
              .then((res) => {
                res.slice(0, 50).map((data) =>
                  add({ id: data.bookID, key: data.bookID, ...data }).then(
                    (error) => {
                      console.log(error);
                      return '';
                    }
                  )
                );
                setIsData(true);
              });
         
        
    } catch (error) {}
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
