import React, { useState } from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";
import ThumbNailInput from "src/Components/ThumbNailInput";
import { API_KEY } from "src/secret";
import useInput from "src/Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { HOSTING } from "src/Queries.queries";
import { hostingPost, hostingPostVariables } from "src/types/api";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const Box = styled.div`
  border: ${Theme.boxBorder};
  width: 850px;
  padding: 15px;
  min-height: 50vh;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  div {
    align-self: flex-end;
  }
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
  color: ${Theme.blackColor};
`;
const Textarea = styled(TextareaAutosize)`
  border: ${Theme.boxBorder};
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  font-size: 14px;
`;
const HostingButton = styled.div`
  background-color: ${Theme.redColor};
  border: ${Theme.boxBorder};
  cursor: pointer;
  width: 60px;
  padding: 12px;
  color: ${Theme.whiteColor};
  display: flex;
  align-items: center;
  border-radius: 6px;
  justify-content: center;
`;

const Hosting: React.SFC = () => {
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const caption = useInput("");
  const location = useInput("");
  const maxPeople = useInput("");
  const checkIn = useInput("");
  const checkOut = useInput("");
  const price = useInput("");
  const hostMutation = useMutation<hostingPost, hostingPostVariables>(HOSTING, {
    variables: {
      thumbNail: thumbnailUrl,
      caption: caption.valueState,
      location: location.valueState,
      maxPeopleCount: parseInt(maxPeople.valueState, 10),
      checkIn: checkIn.valueState,
      checkOut: checkOut.valueState,
      price: parseInt(price.valueState, 10)
    }
  });
  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const {
      target: { files }
    } = e;
    if (files) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", API_KEY);
      formData.append("upload_preset", "bojlyeke");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
        formData
      );
      if (secure_url) {
        await setThumbnailUrl(secure_url);
        setUploading(false);
      }
    }
  };
  const onClickHost = async () => {
    const captionValue = caption.valueState;
    const locationValue = location.valueState;
    const maxPeopleValue = maxPeople.valueState;
    const checkInValue = checkIn.valueState;
    const checkOutValue = checkOut.valueState;
    const priceValue = price.valueState;
    if (
      thumbnailUrl === "" ||
      captionValue === "" ||
      locationValue === "" ||
      maxPeopleValue === "" ||
      checkInValue === "" ||
      checkOutValue === "" ||
      priceValue === ""
    ) {
      toast.error("모든요소는 필수사항 입니다 🙄");
      return;
    } else {
      const [hostMutationFn, { loading }] = hostMutation;
      try {
        const { data } = await hostMutationFn();
        if (!loading && data && data.hostingPost) {
          if (data.hostingPost.ok) {
            toast.success("숙소 등록이 완료되었습니다 😍");
            setTimeout(() => {
              window.location.href = "http://localhost:3000/#/";
            }, 2000);
          } else {
            toast.error(data.hostingPost.error);
          }
        } else {
          toast.error("알수 없는 오류입니다 😥");
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
  };
  return (
    <Container>
      <Box>
        <ThumbNailInput
          uploading={uploading}
          fileUrl={thumbnailUrl}
          onChange={onChangeInput}
        />
        <Column>
          <Title>숙소 이름</Title>
          <Textarea
            placeholder={"숙소 이름(EX:신라호텔)"}
            value={caption.valueState}
            onChange={caption.onChange}
          />
        </Column>
        <Column>
          <Title>위치</Title>
          <Textarea
            placeholder={"위치(EX: 서울) "}
            value={location.valueState}
            onChange={location.onChange}
          />
        </Column>
        <Column>
          <Title>최대 허용 인원</Title>
          <Textarea
            placeholder={"최대 허용 인원(EX:50)"}
            value={maxPeople.valueState}
            onChange={maxPeople.onChange}
          />
        </Column>
        <Column>
          <Title>체크인</Title>
          <Textarea
            placeholder={"체크인(EX:2019-07-24)"}
            value={checkIn.valueState}
            onChange={checkIn.onChange}
          />
        </Column>
        <Column>
          <Title>체크 아웃</Title>
          <Textarea
            placeholder={"체크 아웃(EX:2019-08-11)"}
            value={checkOut.valueState}
            onChange={checkOut.onChange}
          />
        </Column>
        <Column>
          <Title>가격</Title>
          <Textarea
            placeholder={"가격(EX:550000)"}
            value={price.valueState}
            onChange={price.onChange}
          />
        </Column>
        <Column>
          <HostingButton onClick={onClickHost}>게시</HostingButton>
        </Column>
      </Box>
    </Container>
  );
};

export default Hosting;
