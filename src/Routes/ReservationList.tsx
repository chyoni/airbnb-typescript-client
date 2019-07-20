import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

interface IMatchParams {
  username: string;
}

const ReservationList: React.SFC<RouteComponentProps<IMatchParams>> = ({
  match: {
    params: { username }
  }
}) => {
  return <Container>{username} ReservationList</Container>;
};

export default withRouter(ReservationList);
