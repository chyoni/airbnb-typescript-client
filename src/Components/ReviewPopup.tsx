import React, { useState } from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import TextareaAutosize from "react-autosize-textarea";
import { Close, HeartOutline, HeartFull } from "./Icons";
import useInput from "src/Hooks/useInput";
import Button from "./Button";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "src/Queries.queries";
import {
  toggleLike,
  toggleLikeVariables,
  addComment,
  addCommentVariables
} from "src/types/api";
import { toast } from "react-toastify";

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PopUpContainer = styled.div`
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
  border-radius: 10px;
`;
const Header = styled.div`
  border-bottom: ${Theme.boxBorder};
  width: 100%;
  height: 60px;
  display: flex;
  padding: 10px;
`;
const HeaderTitle = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  font-family: "Sunflower", sans-serif;
  color: ${Theme.greenColor};
`;
const HeaderClose = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${Theme.greenColor};
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ReviewType = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 420px;
  border-bottom: ${Theme.boxBorder};
`;
const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${Theme.titleColor};
  margin-bottom: 10px;
`;
const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
  font-size: 14px;
`;
const LikeType = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
const HeartBox = styled.div`
  display: flex;
  align-items: center;
`;
const HeartIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const HiddenBox = styled.div`
  display: flex;
  width: 418px;
  align-items: center;
`;
const OpacityText = styled<any>("span")`
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
  color: ${Theme.redColor};
  opacity: ${props => (props.likeState ? 1 : 0)};
  transition: opacity 1.5s linear;
`;
const SubmitBox = styled.div`
  display: flex;
  padding: 15px;
  justify-content: flex-end;
`;

interface IProps {
  postId: string;
  closePopUp: () => void;
}

const ReviewPopUp: React.SFC<IProps> = ({ postId, closePopUp }) => {
  const [likeState, setLikeState] = useState(false);
  const comment = useInput("");
  const toggleLikeMutation = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: { postId }
    }
  );
  const addCommentMutation = useMutation<addComment, addCommentVariables>(
    ADD_COMMENT,
    {
      variables: { postId, text: comment.valueState }
    }
  );
  const handleLike = async (): Promise<void> => {
    await setLikeState(!likeState);
    const [toggleLikeFn, { loading }] = toggleLikeMutation;
    const { data } = await toggleLikeFn();
    if (!loading && data && data.toggleLike && data.toggleLike.ok) {
      return;
    } else {
      toast.error("알수없는 오류입니다 😥");
      setLikeState(!likeState);
    }
  };
  const handleComment = async () => {
    const commentValue = comment.valueState;
    if (commentValue !== "") {
      const [addCommentFn, { loading }] = addCommentMutation;
      const { data } = await addCommentFn();
      if (!loading && data && data.addComment) {
        if (data.addComment.ok) {
          toast.success("소중한 후기 감사합니다 😍😳");
          closePopUp();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error(data.addComment.error);
        }
      } else {
        toast.error("잠시 후 다시시도해 주세요 😥");
      }
    } else {
      toast.error("후기를 작성하시고 완료버튼을 눌러주세요 😅");
    }
  };
  return (
    <BackGround>
      <PopUpContainer>
        <Header>
          <HeaderTitle>
            <Title>후기 작성</Title>
          </HeaderTitle>
          <HeaderClose onClick={closePopUp}>
            <Close />
          </HeaderClose>
        </Header>
        <Body>
          <ReviewType>
            <Text>고객님의 소중한 후기를 작성해주세요 😍</Text>
            <Textarea
              placeholder={"후기 작성..."}
              value={comment.valueState}
              onChange={comment.onChange}
            />
          </ReviewType>
          <LikeType>
            <Text>고객님 소중한 시간 잘 보내셨나요? 🤗</Text>
            <Text>
              고객님이 머무르신 숙박소가 좋으셨다면 하트한번 꾹 눌러주세요 😍
            </Text>
            <Text>고객님의 소중한 좋아요 한표에요 😚</Text>
            <HeartBox>
              <HeartIcon onClick={handleLike}>
                {likeState ? <HeartFull /> : <HeartOutline />}
              </HeartIcon>
              <HiddenBox>
                <OpacityText likeState={likeState}>
                  {" "}
                  💗좋아요가 반영되었습니다💗
                </OpacityText>
              </HiddenBox>
            </HeartBox>
          </LikeType>
          <SubmitBox>
            <Button
              color={Theme.greenColor}
              text={"완료"}
              width={"100px"}
              onClick={handleComment}
            />
          </SubmitBox>
        </Body>
      </PopUpContainer>
    </BackGround>
  );
};

export default ReviewPopUp;
