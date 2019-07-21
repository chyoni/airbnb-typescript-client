import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import Loader from "src/Components/Loader";
import { SEE_POST, MAKE_RESERVE } from "src/Queries.queries";
import {
  seeFullPost,
  seeFullPostVariables,
  makeReservation,
  makeReservationVariables
} from "src/types/api";
import Avatar from "src/Components/Avatar";
import CommentList from "src/Components/CommentList";
import Button from "src/Components/Button";
import Theme from "src/Styles/Theme";
import Input from "src/Components/Input";
import useInput from "src/Hooks/useInput";
import { toast } from "react-toastify";

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
const ReserveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const ReserveBox = styled.div`
  padding: 15px;
  border: ${props => props.theme.boxBorder};
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  div {
    &:last-child {
      margin-top: 13px;
    }
  }
`;
const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ColumnText = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 7px;
  color: ${props => props.theme.titleColor};
`;
const DateSelectBox = styled.div`
  display: flex;
  input {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
const ExInput = styled(Input)`
  padding: 5px;
  &::placeholder {
    font-size: 14px;
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
  const [isReserve, setIsReserve] = useState(false);
  const checkIn = useInput("");
  const checkOut = useInput("");
  const guestCount = useInput("");
  const reserveMutation = useMutation<
    makeReservation,
    makeReservationVariables
  >(MAKE_RESERVE, {
    variables: {
      postId,
      guestCount: parseInt(guestCount.valueState, 10),
      arriveAt: checkIn.valueState,
      leaveAt: checkOut.valueState
    }
  });
  const handleToggle = (): void => {
    if (isReserve) {
      setIsReserve(false);
    } else {
      setIsReserve(true);
    }
  };
  const handleReserve = async (): Promise<void> => {
    const checkInValue = checkIn.valueState;
    const checkOutValue = checkOut.valueState;
    const guestCountValue = guestCount.valueState;
    if (checkInValue === "" || checkOutValue === "" || guestCountValue === "") {
      toast.error("입력사항을 모두 입력해주세요 🙄");
    } else {
      const [reserveFn, { loading: reserveLoading }] = reserveMutation;
      try {
        const { data: reserveData } = await reserveFn();
        if (!reserveLoading && reserveData && reserveData.makeReservation) {
          if (reserveData.makeReservation.ok) {
            toast.success("예약이 완료되었습니다 😍");
            setTimeout(() => {
              window.location.href = "http://localhost:3000/#/reservation";
            }, 1500);
          } else {
            toast.error(reserveData.makeReservation.error);
          }
        }
      } catch {
        toast.error("일시적 오류입니다 😥");
      }
    }
  };

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
            <ReserveContainer>
              {isReserve ? (
                <>
                  <Text>예약 정보</Text>
                  <ReserveBox>
                    <ColumnBox>
                      <ColumnText>날짜</ColumnText>
                      <DateSelectBox>
                        <ExInput
                          width={"180px"}
                          placeholder={"체크인(EX: 2019-07-21)"}
                          value={checkIn.valueState}
                          onChange={checkIn.onChange}
                        />
                        <ExInput
                          width={"180px"}
                          placeholder={"체크아웃(EX: 2019-07-23)"}
                          value={checkOut.valueState}
                          onChange={checkOut.onChange}
                        />
                      </DateSelectBox>
                    </ColumnBox>
                    <ColumnBox>
                      <ColumnText>인원</ColumnText>
                      <ExInput
                        width={"370px"}
                        placeholder={"인원 수(EX: 1)"}
                        value={guestCount.valueState}
                        onChange={guestCount.onChange}
                      />
                    </ColumnBox>
                    <Button
                      width={"370px"}
                      color={Theme.redColor}
                      onClick={handleReserve}
                      text={"예약"}
                    />
                  </ReserveBox>
                </>
              ) : (
                <Button
                  width={"450px"}
                  color={Theme.redColor}
                  onClick={handleToggle}
                  text={"예약하기"}
                />
              )}
            </ReserveContainer>
          </Container>
        </>
      );
    } else {
      return null;
    }
  }
};

export default withRouter(Detail);
