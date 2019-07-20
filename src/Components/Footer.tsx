import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 35px;
  height: 35px;
`;
const Text = styled.span`
  font-size: 20px;
  padding: 0 10px;
  color: ${Theme.redColor};
  font-family: "Righteous", cursive;
`;

const Footer: React.SFC = () => {
  return (
    <Container>
      <Image src={require("../Images/logo.png")} />
      <Text>WoniBnB</Text>
      <Image src={require("../Images/logo.png")} />
    </Container>
  );
};

export default Footer;
