import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { SEE_POST_LOGIN, SEE_POST_LOGOUT } from "src/Queries.queries";
import Loader from "src/Components/Loader";
import { IS_LOGGEDIN } from "src/LocalQueries";

interface IMatchParams {
  postId: string;
}

const Detail: React.SFC<RouteComponentProps<IMatchParams>> = ({
  match: {
    params: { postId }
  }
}) => {
  const { data, loading } = useQuery(IS_LOGGEDIN);
  if (loading) {
    return <Loader />;
  } else {
    if (data.isLoggedIn) {
      const { data: postData, loading: postLoading } = useQuery(
        SEE_POST_LOGIN,
        { variables: { postId } }
      );
      if (postLoading) {
        return <Loader />;
      } else {
        console.log(postData);
        return <div>LoginHI</div>;
      }
    } else {
      const { data: postD, loading: postL } = useQuery(SEE_POST_LOGOUT, {
        variables: { postId }
      });
      if (postL) {
        return <Loader />;
      } else {
        console.log(postD);
        return <div>LogoutHI</div>;
      }
    }
  }
};

export default withRouter(Detail);
