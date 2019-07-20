import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Theme from "src/Styles/Theme";
import { Link } from "react-router-dom";

interface IProps {
  createdDate: string | null;
  text: string;
  user: any;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const AvatarContainer = styled.div`
  margin-right: 10px;
`;
const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Username = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const Date = styled.span`
  font-size: 15px;
  color: ${Theme.greyColor};
`;
const Text = styled.span`
  font-size: 19px;
  max-width: 730px;
`;

const CommentList: React.SFC<IProps> = ({ createdDate, text, user }) => {
  return (
    <Wrapper>
      <Header>
        <AvatarContainer>
          <Link to={`/user/${user.username}`}>
            <Avatar src={user.avatar} size={"toosmall"} />
          </Link>
        </AvatarContainer>
        <UserMeta>
          <Link to={`/user/${user.username}`}>
            <Username>{user.username}</Username>
          </Link>
          <Date>{createdDate}</Date>
        </UserMeta>
      </Header>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default CommentList;
