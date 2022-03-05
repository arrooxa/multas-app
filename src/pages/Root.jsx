import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import StoreProvider from "components/Store/Provider";
import RoutesPrivate from "components/Routes/Private/Private";

const PagesRoot = () => (
  <StoreProvider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </Router>
  </StoreProvider>
);

export default PagesRoot;
