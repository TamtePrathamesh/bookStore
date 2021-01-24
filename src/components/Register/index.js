import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { Form, Input, Button } from "antd";

import "./style.scss";

const Register = () => {
  const [msg, setMsg] = useState("");
  const { getByIndex, add } = useIndexedDB("users");

  const onFinish = (value) => {
    getByIndex("email", value.email).then(
      (res) => {
        if (!res) {
          add({ ...value, cart: [], orders: [] });
          setMsg("Registration successful!");
        } else {
          setMsg("User already exists !");
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
        <div className="title">Register</div>
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
              Register
            </Button>
            <span style={{ marginLeft: "10px" }}>
              Or <a href="/login">login now!</a>
            </span>
          </Form.Item>
          <div style={{ color: "red", fontWeight: "100" }}> {msg}</div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
