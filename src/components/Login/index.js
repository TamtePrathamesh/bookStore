import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { Form, Input, Button } from "antd";
import Authentication from "../auth";

import "./style.scss";

const LoginPage = () => {
  const history = useHistory();

  const [msg, setMsg] = useState("");
  const { getByIndex } = useIndexedDB("users");

  const onFinish = (value) => {
    getByIndex("email", value.email).then(
      (res) => {
        if (res) {
          if (value.password === res.password) {
            Authentication.setEmail(res.email);
            Authentication.setLogin(true);
            history.push("/home");
          } else {
            setMsg("Please check your password");
          }
        } else {
          setMsg("User doesn't exists. Register ");
        }
      },
      (errors) => {
        console.log(" user doesnt exists", errors);
      }
    );
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="reading-time"></div>
        <div className="title">Login</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <span style={{ marginLeft: "10px" }}>
              Or <a href="/register">register now!</a>
            </span>
          </Form.Item>
          <div style={{ color: "red", fontWeight: "100" }}> {msg}</div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
