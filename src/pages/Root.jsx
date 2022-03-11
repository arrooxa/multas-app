import React, {useContext} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import StoreProvider from "components/Store/Provider";
import RoutesPrivate from "components/Routes/Private/Private";
import StoreContext from "components/Store/Context";

const PagesRoot = () => {
  const { token } = useContext(StoreContext)
  
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route path="/" exact render={() => {
            return (
              token ? 
              <Redirect to="/home" /> :
              <Redirect to="/login" /> 
            )
          }}/>
          <RoutesPrivate path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </StoreProvider>
  )
};

export default PagesRoot;
