import React from "react";
import styled from "styled-components";

const Container = styled.input`
  width: ${props => props.width};
  padding: 15px;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.whiteColor};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 16px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-size: 16px;
  }
`;

interface IProps {
  width: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}

const Input: React.SFC<IProps> = ({ width, placeholder, value, onChange }) => {
  return (
    <Container
      width={width}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
