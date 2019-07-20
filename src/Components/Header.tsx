import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import LinkButton from "./LinkButton";
import useInput from "src/Hooks/useInput";
import { useQuery } from "react-apollo-hooks";
import { MY_PROFILE } from "src/Queries.queries";
import { myProfile } from "src/types/api";

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
  @media (max-width: 910px) {
    justify-content: center;
  }
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

const InputWrapper = styled.div`
  @media (max-width: 910px) {
    display: none;
  }
`;
const MetaWrapper = styled.div`
  display: flex;
  height: 80px;
  @media (max-width: 910px) {
    display: none;
  }
`;

interface IProps {
  isLoggedIn: boolean;
}
const Header: React.SFC<IProps> = ({ isLoggedIn }) => {
  const { data, loading } = useQuery<myProfile, null>(MY_PROFILE);
  console.log(data);
  const search = useInput("");
  if (isLoggedIn) {
    return (
      <Wrapper>
        <InnerWrapper>
          <LogoWrapper>
            <Link to={"/"}>
              <Image src={require("../Images/logo.png")} />
            </Link>
          </LogoWrapper>
          <InputWrapper>
            <Input
              width={"500px"}
              value={search.valueState}
              onChange={search.onChange}
              placeholder={"검색"}
            />
          </InputWrapper>
          <MetaWrapper>
            <Link to={"/hosting"}>
              <LinkButton text={"호스트가 되어보세요"} />
            </Link>
            {loading ? (
              <LinkButton text={"여행 목록"} />
            ) : (
              !loading &&
              data &&
              data.myProfile &&
              data.myProfile.username && (
                <Link to={`/reservation/${data.myProfile.username}`}>
                  <LinkButton text={"여행 목록"} />
                </Link>
              )
            )}
            {loading ? (
              <LinkButton text={"내 프로필"} />
            ) : (
              !loading &&
              data &&
              data.myProfile &&
              data.myProfile.username && (
                <Link to={`/user/${data.myProfile.username}`}>
                  <LinkButton text={"내 프로필"} />
                </Link>
              )
            )}
          </MetaWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default Header;
