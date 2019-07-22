import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "src/Routes/Feed";
import Auth from "src/Routes/Auth";
import Detail from "src/Routes/Detail";
import Profile from "src/Routes/Profile";
import ReservationList from "src/Routes/ReservationList";
import Hosting from "src/Routes/Hosting";
import Search from "src/Routes/Search";
import Edit from "src/Routes/Edit";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

const LoggedInRoutes: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Feed} />
      <Route exact={true} path={"/detail/:postId"} component={Detail} />
      <Route exact={true} path={"/user/:username"} component={Profile} />
      <Route exact={true} path={"/hosting"} component={Hosting} />
      <Route exact={true} path={"/reservation"} component={ReservationList} />
      <Route exact={true} path={"/search"} component={Search} />
      <Route exact={true} path={"/edit"} component={Edit} />
    </Switch>
  );
};

const LoggedOutRoutes: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Auth} />
    </Switch>
  );
};

export default AppRouter;
