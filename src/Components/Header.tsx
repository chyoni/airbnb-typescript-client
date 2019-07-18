import React from "react";
import styled from "styled-components";
import Input from "./Input";
import LinkButton from "./LinkButton";
import useInput from "src/Hooks/useInput";

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${props => props.theme.boxBorder};
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-left: 10px;
`;

const Image = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const InputWrapper = styled.div``;
const MetaWrapper = styled.div`
  display: flex;
  height: 80px;
`;

interface IProps {
  isLoggedIn: boolean;
}
const Header: React.SFC<IProps> = ({ isLoggedIn }) => {
  const search = useInput("");
  return (
    <Wrapper>
      <InnerWrapper>
        <LogoWrapper>
          <Image src={require("../Images/logo.png")} />
        </LogoWrapper>
        <InputWrapper>
          <Input
            width={"500px"}
            value={search.valueState}
            onChange={search.onChange}
            placeholder={"🔍 검색"}
          />
        </InputWrapper>
        <MetaWrapper>
          <LinkButton text={"호스트가 되어보세요"} />
          <LinkButton text={"회원가입"} />
          {isLoggedIn ? null : <LinkButton text={"로그인"} />}
        </MetaWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;
