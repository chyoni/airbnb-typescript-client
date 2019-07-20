import React from "react";
import styled from "styled-components";

const Container = styled<any>("img")`
  width: ${props =>
    props.size === "big" ? "120px" : props.size === "mid" ? "90px" : "50px"};
  border-radius: ${props =>
    props.size === "big" ? "60px" : props.size === "mid" ? "45px" : "25px"};
  height: ${props =>
    props.size === "big" ? "120px" : props.size === "mid" ? "90px" : "50px"};
`;

interface IProps {
  size: string;
  src: string | null;
}

const Avatar: React.SFC<IProps> = ({ size, src }) => {
  return (
    <Container size={size} src={src || require("../Images/noPhoto.jpg")} />
  );
};

export default Avatar;
