import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { Layout, Input, Spin } from "antd";
import Table from "./components/Table";
import Authentication from "../auth";
import HeaderComp from "../Header";

import "./style.scss";

const { Content } = Layout;
const { Search } = Input;

const Home = () => {
  const history = useHistory();
  const { getAll } = useIndexedDB("books");
  const [books, setBooks] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (Authentication.getLogin() === "true") {
      getAll().then((result) => {
        setIsLoading(true);
        setBooks(result);
        setIsLoading(false);
      });
    } else {
      history.push("/login");
    }
  }, []);

  const onSearch = (value) => {
    console.log(value);
  };

  const onSearchChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="home">
      <HeaderComp />
      <div className="search-section">
        <div className="search">
          <Search
            placeholder="enter book name"
            allowClear
            onChange={onSearchChange}
            onSearch={onSearch}
            size="large"
          />
        </div>
      </div>

      <div className="title">
        <span>{"Books Catalog"}</span>
      </div>

      <Content>
        <div className="content">
          {IsLoading && (
            <div className="spinner">
              <Spin size="large" />
            </div>
          )}

          {!IsLoading && (
            <Table
              data={books.filter((book) => {
                return (
                  String(book.title)
                    .toLocaleLowerCase()
                    .indexOf(filter.toLowerCase()) !== -1
                );
              })}
            />
          )}
        </div>
      </Content>
    </div>
  );
};

export default Home;
