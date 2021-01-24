import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { Layout, Tag, Statistic, Rate, Button } from "antd";
import { StarFilled } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Authentication from "../auth";

import "./style.scss";

const { Header, Content } = Layout;

const BookDetail = (props) => {
  const history = useHistory();

  const { getByID } = useIndexedDB("books");
  const { getByIndex, update } = useIndexedDB("users");
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});

  useEffect(() => {
    if (props.match.params.id) {
      getByID(props.match.params.id).then((book) => {
        setBook(book);
      });
      getByIndex("email", Authentication.getEmail()).then(
        (res) => {
          if (res) {
            setUser(user);
          }
        },
        (errors) => {
          console.log("errors", errors);
        }
      );
    }
  }, []);

  const addToCart = () => {
    console.log("the user", user);
    getByIndex("email", Authentication.getEmail()).then(
      (res) => {
        console.log(
          "is it",
          res.cart,
          res?.cart.includes(props.match.params.id)
        );

        if (
          res.cart.includes(res.cart.find((i) => i.bookID === book.bookID)) ===
          false
        ) {
          update({
            userId: res.userId,
            cart: [...res.cart, { ...book, quantity: 1 }],
            email: res.email,
            password: res.password,
            orders: res.orders,
          });
        }
        history.push("/cart");
      },
      () => {}
    );
  };

  return (
    <div className="book-details">
      <Header className="header-title">{"BookShop"}</Header>
      <Content>
        <div className="book-data">
          <div className="side-image"></div>
          <div className="book-content">
            <div className="author">{book.authors}</div>
            <div className="title">{book.title}</div>
            <div className="tag">
              <Tag color="#55acee">{book.language_code}</Tag>
              <div className="price-tag">{`₹ ${book.price}`}</div>
            </div>

            <div className="statistics">
              <div>
                <Statistic
                  title={"Total Ratings"}
                  value={book.ratings_count}
                  prefix={<StarFilled />}
                />
              </div>

              <div className="rating">
                <div>
                  <div>{"Average Rating"}</div>
                  <Rate value={book.average_rating} disabled />
                </div>
              </div>
            </div>

            <div className="add-to-cart">
              <Button icon={<ShoppingCartOutlined />} onClick={addToCart}>
                {"Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default withRouter(BookDetail);
