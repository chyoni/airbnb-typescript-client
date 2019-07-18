import React from "react";
import styled, { keyframes } from "styled-components";
import { Circle } from "./Icons";

const Animation = keyframes`
    0% {
        opacity:0
    }
    50% {
        opacity:1
    }
    100% {
        opacity:0
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  svg {
    width: 13px;
    margin-right: 5px;
    fill: ${props => props.theme.greenColor};
    animation: ${Animation} 1s linear infinite;
  }
`;

const Loader: React.SFC = () => {
  return (
    <Container>
      <Circle />
      <Circle />
      <Circle />
    </Container>
  );
};

export default Loader;
