import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "src/Routes/Feed";
import Auth from "src/Routes/Auth";
import Detail from "src/Routes/Detail";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Feed} />
      <Route exact={true} path={"/auth"} component={Auth} />
      <Route exact={true} path={"/detail/:postId"} component={Detail} />
    </Switch>
  );
};

export default AppRouter;
