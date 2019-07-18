import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 15px;
  margin-right: 5px;
  height: 79px;
  background-color: ${props => props.theme.whiteColor};
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.blackColor};
  &:hover {
    border-bottom: 2px solid ${props => props.theme.greyColor};
  }
`;

interface IProps {
  text: string;
  className?: string;
}

const LinkButton: React.SFC<IProps> = ({ text, className }) => {
  return <Container className={className}>{text}</Container>;
};

export default LinkButton;
