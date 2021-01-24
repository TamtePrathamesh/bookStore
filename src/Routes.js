import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookDetail from "./components/BookDetail";
import Cart from "./components/Cart";
import LoginPage from "./components/Login";
import Orders from "./components/Orders";
import Register from "./components/Register";
import { asyncLoader } from "./services";

const Home = import("./components/Home");

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={asyncLoader(Home)} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/bookdetails/:id" component={BookDetail} />
      </Switch>
    </Router>
  );
};

export default Routes;
