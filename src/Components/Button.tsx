import React from "react";
import styled from "styled-components";

const Container = styled<any>("div")`
  width: ${props => props.width};
  cursor: pointer;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  border-radius: 6px;
  color: white;
`;

interface IProps {
  width: string;
  color: string;
  text: string;
  onClick: any;
}

const Button: React.SFC<IProps> = ({ width, color, text, onClick }) => {
  return (
    <Container width={width} color={color} onClick={onClick}>
      {text}
    </Container>
  );
};

export default Button;
