import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div``;

interface IMatchParams {
  username: string;
}

const Profile: React.SFC<RouteComponentProps<IMatchParams>> = ({
  match: {
    params: { username }
  }
}) => {
  return <ProfileContainer>{username} Profile</ProfileContainer>;
};

export default withRouter(Profile);
