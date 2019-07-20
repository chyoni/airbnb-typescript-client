import React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Loader from "src/Components/Loader";
import { SEE_POST } from "src/Queries.queries";
import { seeFullPost, seeFullPostVariables } from "src/types/api";
import Avatar from "src/Components/Avatar";
import CommentList from "src/Components/CommentList";

const ThumbNail = styled<any>("div")`
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 75vh;
  background-image: url(${props => props.thumbNail});
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;
const Caption = styled.span`
  font-size: 40px;
  color: ${props => props.theme.titleColor};
  font-weight: 600;
  margin-bottom: 20px;
`;
const Location = styled.span`
  font-size: 20px;
  color: ${props => props.theme.lightGreyColor};
`;
const HostMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.superLightGreyColor};
`;
const Text = styled.span`
  font-size: 20px;
  color: ${props => props.theme.greenColor};
  margin-bottom: 10px;
`;
const HostCard = styled.div`
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  font-size: 17px;
  color: ${props => props.theme.blackColor};
  margin-left: 15px;
`;
const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.superLightGreyColor};
  border-bottom: 1px solid ${props => props.theme.superLightGreyColor};
`;
const Horizontal = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;
const Info = styled.span`
  display: block;
  font-size: 17px;
  color: ${props => props.theme.blackColor};
  margin-left: 5px;
`;
const Bold = styled.span`
  font-weight: 600;
  font-size: 17px;
  color: ${props => props.theme.blackColor};
`;
const ReviewMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-top: 15px;
  border-bottom: 1px solid ${props => props.theme.superLightGreyColor};
`;
const ReviewText = styled.span`
  font-size: 30px;
  margin-bottom: 15px;
  font-weight: 600;
  color: ${props => props.theme.titleColor};
`;
const ReviewBox = styled.div`
  width: 100%;
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IMatchParams {
  postId: string;
}

const Detail: React.SFC<RouteComponentProps<IMatchParams>> = ({
  match: {
    params: { postId }
  }
}) => {
  const { data, loading } = useQuery<seeFullPost, seeFullPostVariables>(
    SEE_POST,
    {
      variables: { postId }
    }
  );
  console.log(data, loading);
  if (loading) {
    return <Loader />;
  } else {
    if (data && data.seeFullPost && data.seeFullPost.post) {
      const post = data.seeFullPost.post;
      return (
        <>
          <ThumbNail thumbNail={post.thumbNail} />
          <Container>
            <Header>
              <Vertical>
                <Caption>{post.caption}</Caption>
                <Location>{post.location}</Location>
              </Vertical>
              <HostMeta>
                <Text>호스트 정보</Text>
                <HostCard>
                  <Link to={`/user/${post.host.username}`}>
                    <Avatar src={post.host.avatar} size={"mid"} />
                  </Link>
                  <Username>{post.host.username}</Username>
                </HostCard>
              </HostMeta>
              <PostMeta>
                <Text>숙박 정보</Text>
                <Horizontal>
                  <Bold>숙박 가능한 날짜:</Bold>
                  <Info>{`${post.checkIn} ㅡ ${post.checkOut}`}</Info>
                </Horizontal>
                <Horizontal>
                  <Bold>가격:</Bold>
                  <Info>{`${post.price}원`}</Info>
                </Horizontal>
                <Horizontal>
                  <Bold>최대 허용 인원:</Bold>
                  <Info>{`${post.maxPeopleCount}명`}</Info>
                </Horizontal>
                <Horizontal>
                  <Bold>좋아요:</Bold>
                  <Info>{`${post.likeCount}개`}</Info>
                </Horizontal>
                <Horizontal>
                  <Bold>게시일:</Bold>
                  <Info>{`${post.createdDate}`}</Info>
                </Horizontal>
              </PostMeta>
              <ReviewMeta>
                <ReviewText>{`후기 ${post.commentCount}개`}</ReviewText>
                <ReviewBox>
                  {post.comments.map(comment => (
                    <CommentList
                      key={comment.id}
                      createdDate={comment.createdDate}
                      text={comment.text}
                      user={comment.user}
                    />
                  ))}
                </ReviewBox>
              </ReviewMeta>
            </Header>
          </Container>
        </>
      );
    } else {
      return null;
    }
  }
};

export default withRouter(Detail);
