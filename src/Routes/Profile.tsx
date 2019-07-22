import React, { useState } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEE_USER } from "src/Queries.queries";
import { seeUser, seeUserVariables } from "src/types/api";
import Loader from "src/Components/Loader";
import Theme from "src/Styles/Theme";
import Avatar from "src/Components/Avatar";
import { Prev, Next, Heart, Setting } from "src/Components/Icons";
import CommentList from "src/Components/CommentList";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  min-height: 70vh;
`;
const ParentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const UserContainer = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
`;
const UserCard = styled.div`
  border: ${Theme.boxBorder};
  background-color: ${Theme.whiteColor};
  width: 300px;
  min-height: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const AvatarField = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${Theme.boxBorder};
  padding-bottom: 30px;
`;
const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  div {
    &:first-child {
      margin-bottom: 15px;
    }
  }
`;
const Column = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const SettingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  svg {
    fill: ${Theme.greenColor};
    cursor: pointer;
  }
  span {
    font-size: 15px;
    margin-left: 10px;
    color: ${Theme.greenColor};
  }
`;
const Emoji = styled.span`
  height: 100%;
  font-size: 17px;
  margin-right: 18px;
`;
const Data = styled.span`
  height: 100%;
  font-size: 17px;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  margin-right: 120px;
`;
const Username = styled.span`
  font-size: 50px;
  color: ${Theme.titleColor};
  margin-bottom: 10px;
`;
const CreatedDate = styled.span`
  font-size: 17px;
  color: ${Theme.titleColor};
  margin-right: 10px;
  margin-bottom: 40px;
`;

const HostList = styled.div`
  display: flex;
  border-top: ${Theme.boxBorder};
  flex-direction: column;
  padding: 40px 0;
`;
const HostListTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 25px;
  color: ${Theme.titleColor};
`;
const HostListBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ButtonAction = styled.div`
  width: 30px;
  height: 100%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    fill: ${Theme.greenColor};
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
    transition: opacity 0.5s linear;
  }
`;
const HostCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 514px;
`;
const HostCardImage = styled<any>("div")`
  background-image: url(${props => props.thumbNail});
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  width: 514px;
  height: 300px;
`;
const HostCardMeta = styled.div`
  display: flex;
  margin-top: 6px;
  flex-direction: column;
  width: 100%;
  div {
    &:last-child {
      svg {
        fill: ${Theme.greenColor};
        width: 15px;
        height: 15px;
      }
    }
  }
`;
const Location = styled.span`
  color: ${Theme.greyColor};
  font-size: 16px;
  padding-bottom: 5px;
`;
const Caption = styled.span`
  color: ${Theme.titleColor};
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 5px;
`;
const Like = styled.span`
  font-size: 15px;
  margin-left: 4px;
  color: ${Theme.greyColor};
`;
const CommentBox = styled.div`
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  border-top: ${Theme.boxBorder};
`;
const CommentBoxTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 25px;
  color: ${Theme.titleColor};
`;

const ReviewBox = styled.div`
  width: 100%;
  max-height: 40vh;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IMatchParams {
  username: string;
}

const Profile: React.SFC<RouteComponentProps<IMatchParams>> = ({
  match: {
    params: { username }
  }
}) => {
  const [currentItem, setCurrentItem] = useState(0);
  const handlePrev = () => {
    setCurrentItem(currentItem - 1);
  };
  const handleNext = () => {
    setCurrentItem(currentItem + 1);
  };
  const { data, loading } = useQuery<seeUser, seeUserVariables>(SEE_USER, {
    variables: { username }
  });

  console.log(data);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeUser) {
    return (
      <Wrapper>
        <ParentContainer>
          <UserContainer>
            <UserCard>
              <AvatarField>
                <Avatar src={data.seeUser.avatar} size={"big"} />
              </AvatarField>
              <InfoField>
                <Column>
                  <Emoji>📩</Emoji>
                  <Data>{`후기 ${data.seeUser.comments.length}개`}</Data>
                </Column>
                <Column>
                  <Emoji>⭕</Emoji>
                  <Data>{`인증 완료`}</Data>
                </Column>
              </InfoField>
            </UserCard>
          </UserContainer>
          <MetaContainer>
            <Column>
              <Username>{`안녕하세요. 저는 ${
                data.seeUser.username
              }입니다.`}</Username>
            </Column>
            <Column>
              <CreatedDate>{`회원가입: ${
                data.seeUser.createdDate
              }`}</CreatedDate>
              {data.seeUser.isSelf && (
                <SettingBox>
                  <Setting />
                  <Data>👈 프로필 수정</Data>
                </SettingBox>
              )}
            </Column>
            {data.seeUser.hostings.length > 0 && (
              <HostList>
                <HostListTitle>{`${
                  data.seeUser.username
                }님의 숙소`}</HostListTitle>
                <HostListBody>
                  {currentItem !== 0 ? (
                    <ButtonAction onClick={handlePrev}>
                      <Prev />
                    </ButtonAction>
                  ) : (
                    <ButtonAction />
                  )}
                  {data.seeUser.hostings.map((hosting, index) => {
                    if (currentItem === index) {
                      return (
                        <Link key={hosting.id} to={`/detail/${hosting.id}`}>
                          <HostCard>
                            <HostCardImage
                              key={hosting.id}
                              thumbNail={hosting.thumbNail}
                            />
                            <HostCardMeta>
                              <Column>
                                <Location>{hosting.location}</Location>
                              </Column>
                              <Column>
                                <Caption>{hosting.caption}</Caption>
                              </Column>
                              <Column>
                                <Heart />
                                <Like>{`(${hosting.likeCount})`}</Like>
                              </Column>
                            </HostCardMeta>
                          </HostCard>
                        </Link>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {currentItem !== data.seeUser.hostings.length - 1 ? (
                    <ButtonAction onClick={handleNext}>
                      <Next />
                    </ButtonAction>
                  ) : (
                    <ButtonAction />
                  )}
                </HostListBody>
              </HostList>
            )}
            <CommentBox>
              <Column>
                <CommentBoxTitle>{`${
                  data.seeUser.username
                }님이 작성한 후기`}</CommentBoxTitle>
              </Column>
              <ReviewBox>
                {data.seeUser.comments.map(comment => (
                  <CommentList
                    key={comment.id}
                    createdDate={comment.createdDate}
                    text={comment.text}
                    user={comment.user}
                  />
                ))}
              </ReviewBox>
            </CommentBox>
          </MetaContainer>
        </ParentContainer>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default withRouter(Profile);
