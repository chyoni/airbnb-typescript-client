import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled.div`
  width: 120px;
  height: 150px;
  margin-bottom: 15px;
`;

const Image = styled.label`
  cursor: pointer;
  height: 120px;
  width: 120px;
  border: ${Theme.boxBorder};
  display: block;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 120px;
    height: 120px;
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

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => {
  return (
    <Container>
      <Input
        id={"photo"}
        type={"file"}
        accept={"image/*"}
        onChange={onChange}
      />
      <Image htmlFor={"photo"}>
        {uploading ? (
          "⏰"
        ) : (
          <img src={fileUrl || require("../Images/noPhoto.jpg")} />
        )}
      </Image>
    </Container>
  );
};

export default PhotoInput;
