import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useIndexedDB } from "react-indexed-db";
import { withRouter } from "react-router-dom";
import { Divider } from "antd";
import Authentication from "../auth";

import "./style.scss";

const { Header, Content } = Layout;

const Cart = () => {
  const [item, setItem] = useState([]);
  const { getByIndex } = useIndexedDB("users");
  const userEmail = Authentication.getEmail();

  useEffect(() => {
    getByIndex("email", userEmail).then((res) => {
      if (res) {
        setItem(res.orders);
      }
    });
  }, []);

  return (
    <div className="orders">
      <Header className="header-title">{"BookShop"}</Header>
      <div className="no-items">
        {item.length === 0 && <div>{"Opps no orders Placed yet"}</div>}
      </div>
      <Content>
        <div className={`cart-items ${item.length === 0 ? "hide" : ""}`}>
          {item.length > 0 &&
            item.map((i) => (
              <div>
                <div className="row">
                  <span className="id">OrderID # {i.orderId}</span>
                  <span className="title">{i.title}</span>
                  <div className="price">{`₹ ${i.price}`}</div>
                  <div>
                    <span>{`Quantity: ${i.quantity}`}</span>
                  </div>
                  <div>
                    <span style={{ color: "green" }}>{"Order Placed"}</span>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
        </div>
      </Content>
    </div>
  );
};

export default withRouter(Cart);
