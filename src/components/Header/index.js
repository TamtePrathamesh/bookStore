import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Avatar, Badge, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useIndexedDB } from "react-indexed-db";
import Authentication from "../auth";

import "./style.scss";

const { Header } = Layout;

const HeaderComp = () => {
  const history = useHistory();
  const { getByIndex } = useIndexedDB("users");
  const [count, setCount] = useState(0);

  const getCount = () => {
    getByIndex("email", Authentication.getEmail()).then((user) => {
      if (user) {
        return setCount(user.cart.length);
      } else {
        return setCount(0);
      }
    });
    return count;
  };

  const onLogOut = () => {
    Authentication.setLogin(false);
    Authentication.setEmail("");
    history.push("/login");
  };

  return (
    <div>
      <Header>
        <div className="header">
          <span className="header-title"> {"BookShop"}</span>
          <div className="items">
            <div>
              <Row>
                <Col>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#f56a00" }}
                  />
                  <span className="email">{Authentication.getEmail()}</span>
                </Col>
              </Row>
            </div>
            <Badge count={getCount()}>
              <div
                className="cart-icon"
                onClick={() => history.push("/cart")}
              ></div>
            </Badge>
            <div className="exist" onClick={onLogOut}></div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default HeaderComp;
