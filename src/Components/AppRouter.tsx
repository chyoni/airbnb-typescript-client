import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "src/Routes/Feed";
import Auth from "src/Routes/Auth";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

const LoggedInRoutes: React.SFC = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Feed} />
    </Switch>
  );
};

const LoggedOutRoutes: React.SFC = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Auth} />
    </Switch>
  );
};

export default AppRouter;
