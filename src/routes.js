import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from './pages/main';
import { isAuthenticated } from "./services/auth";
import SignUp from "./components/auth/SignUp/registration";
import SignIn from "./components/auth/SignIn/login";
import Log from "./pages/log/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>

      <PrivateRoute exact path="/" render={() => (
        isAuthenticated () ? (
          <Redirect to="/log" />
        ) : ( <SignUp />)
      )} />

      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <PrivateRoute path="/log" exact component={Main} />
      <PrivateRoute path="/log/:id" component={Log} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;