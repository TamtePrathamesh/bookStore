import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useIndexedDB } from "react-indexed-db";
import { withRouter, useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { Layout, InputNumber } from "antd";
import { getRandomNumber } from "../../utils";
import Authentication from "../auth";
import { CloseCircleTwoTone, ShoppingCartOutlined } from "@ant-design/icons";

import "./style.scss";

const { Header, Content } = Layout;

/*cart Page */

const Cart = () => {
  const history = useHistory();
  const [item, setItem] = useState([]);
  const { getByIndex, update } = useIndexedDB("users");
  const userEmail = Authentication.getEmail();

  useEffect(() => {
    getByIndex("email", userEmail).then((res) => {
      if (res) {
        setItem(res.cart);
      }
    });
  }, []);

  /* method to calculate total purchase amount */
  const calculateTotal = useCallback(() => {
    if (item.length > 0) {
      let result = 0;
      for (let i = 0; i < item.length; i++) {
        result = result + item[i].price * item[i].quantity;
      }
      return result;
    }
  }, [item]);

  const myPrice = useMemo(() => calculateTotal(), [calculateTotal]);

  /*method to remove items from carts */
  const removeItem = (id) => {
    const items = item.filter((i) => i.bookID !== id);
    getByIndex("email", userEmail).then((res) => {
      if (res) {
        update({
          userId: res.userId,
          cart: items,
          email: res.email,
          password: res.password,
          orders: res.orders,
        });
        setItem(items);
      }
    });
  };

  /*place order with your book in cart */
  const placeOrder = () => {
    if (item.length > 0) {
      const orders = item.map((i) => {
        return { ...i, orderId: getRandomNumber() };
      });
      getByIndex("email", userEmail).then((user) => {
        if (user) {
          update({
            userId: user.userId,
            cart: [],
            email: user.email,
            password: user.password,
            orders: [...user.orders, ...orders],
          });
          history.push("/orders");
        }
      });
    }
  };

  /* updating quantity of book in cart */
  const updateValue = (i, e) => {
    getByIndex("email", userEmail).then((res) => {
      if (res) {
        update({
          userId: res.userId,
          email: res.email,
          password: res.password,
          orders: res.orders,
          cart: res.cart.map((it) => {
            if (it.bookID === i.bookID) {
              return { ...i, quantity: e };
            } else {
              return i;
            }
          }),
        });
        getByIndex("email", userEmail).then((res) => {
          if (res) {
            setItem(res.cart);
          }
        });
      }
    });
  };

  return (
    <div className="cart">
      <Header className="header-title">{"BookShop"}</Header>
      <div className="no-items">
        {item.length === 0 && <div>{"Opps no items in your cart"}</div>}
      </div>
      <Content>
        <div className={`cart-items ${item.length === 0 ? "hide" : ""}`}>
          {item.length > 0 &&
            item.map((i) => (
              <div key={i.bookID}>
                <div className="row">
                  <span className="title"># {i.title}</span>
                  <span className="price">{`₹ ${i.price}`}</span>
                  <span>{`Quantity:`}</span>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={i.quantity}
                    onChange={(e) => updateValue(i, e)}
                  />
                  <Button
                    onClick={() => removeItem(i.bookID)}
                    icon={<CloseCircleTwoTone />}
                  ></Button>
                </div>
                <Divider />
              </div>
            ))}
        </div>
      </Content>

      <div className="footer">
        <Button
          onClick={placeOrder}
          icon={<ShoppingCartOutlined />}
        >{`Checkout   ₹ ${myPrice ? myPrice : 0}`}</Button>
      </div>
    </div>
  );
};

export default withRouter(Cart);
