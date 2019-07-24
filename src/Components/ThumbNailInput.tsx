import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const ThumbNail = styled.label`
  cursor: pointer;
  height: 300px;
  width: 800px;
  border: ${Theme.boxBorder};
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 800px;
    height: 300px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;
const Text = styled.span`
  font-size: 18px;
  color: ${Theme.greyColor};
`;

interface IProps {
  uploading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileUrl: string;
}

const ThumbNailInput: React.SFC<IProps> = ({
  uploading,
  onChange,
  fileUrl
}) => {
  return (
    <Container>
      <Input
        id={"thumbnail"}
        type={"file"}
        accept={"image/*"}
        onChange={onChange}
      />
      <ThumbNail htmlFor={"thumbnail"}>
        {uploading ? (
          "⏰"
        ) : fileUrl !== "" ? (
          <img src={fileUrl} />
        ) : (
          <Text>이미지 업로드</Text>
        )}
      </ThumbNail>
    </Container>
  );
};

export default ThumbNailInput;
