import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { MY_PROFILE, EDIT } from "src/Queries.queries";
import { myProfile, editUser, editUserVariables } from "src/types/api";
import TextareaAutosize from "react-autosize-textarea";
import Loader from "src/Components/Loader";
import { API_KEY } from "src/secret";
import axios from "axios";
import ProfileImageInput from "src/Components/ProfileImageInput";
import Theme from "src/Styles/Theme";
import useInput from "src/Hooks/useInput";
import { toast } from "react-toastify";

const EditContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EditBox = styled.div`
  display: flex;
  width: 800px;
  min-height: 15vh;
  border: ${Theme.boxBorder};
  border-radius: 10px;
`;
const AvatarField = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: ${Theme.boxBorder};
`;
const MetaField = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
`;
const Horizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  span {
    margin-bottom: 5px;
  }
  div {
    align-self: flex-end;
  }
`;
const Text = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.blackColor};
`;
const Textarea = styled(TextareaAutosize)`
  border: ${Theme.boxBorder};
  width: 100%;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
  font-size: 14px;
`;
const SubmitButton = styled.div`
  background-color: ${Theme.whiteColor};
  border: ${Theme.boxBorder};
  width: 60px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${Theme.blackColor};
`;

const Edit: React.SFC = () => {
  const { data, loading } = useQuery<myProfile, null>(MY_PROFILE);
  const [uploading, setUploading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const firstName = useInput("");
  const lastName = useInput("");
  const editMutation = useMutation<editUser, editUserVariables>(EDIT);

  const onPhotoChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
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
        setUploading(false);
        setProfilePhoto(secure_url);
      }
    }
  };

  const onClickEdit = async () => {
    const firstNameValue = firstName.valueState;
    const lastNameValue = lastName.valueState;
    const [editFn, { loading: editLoading }] = editMutation;
    if (loading) {
      toast.error("잠시후에 다시 시도해주세요 😥");
    } else {
      if (firstNameValue === "" || lastNameValue === "") {
        toast.error("성과 이름은 필수 사항입니다 🙄");
        return;
      }
      if (data && data.myProfile.username) {
        if (profilePhoto === "") {
          const { data: editData } = await editFn({
            variables: {
              firstName: firstNameValue,
              lastName: lastNameValue,
              username: data.myProfile.username
            }
          });
          if (!editLoading && editData) {
            if (editData.editUser.ok) {
              toast.success("수정이 완료되었습니다 😊");
              setTimeout(() => {
                window.location.href = `http://localhost:3000/#/user/${
                  data.myProfile.username
                }`;
              }, 1500);
            } else {
              toast.error(editData.editUser.error);
            }
          } else {
            toast.error("일시적 오류입니다 😥");
          }
        } else {
          const { data: edithaveProfileImageData } = await editFn({
            variables: {
              firstName: firstNameValue,
              lastName: lastNameValue,
              username: data.myProfile.username,
              avatar: profilePhoto
            }
          });
          if (!editLoading && edithaveProfileImageData) {
            if (edithaveProfileImageData.editUser.ok) {
              toast.success("수정이 완료되었습니다 😊");
              setTimeout(() => {
                window.location.href = `http://localhost:3000/#/user/${
                  data.myProfile.username
                }`;
              }, 1500);
            } else {
              toast.error(edithaveProfileImageData.editUser.error);
            }
          } else {
            toast.error("일시적 오류입니다 😥");
          }
        }
      } else {
        toast.error("일시적 오류입니다 😥");
      }
    }
  };
  useEffect(() => {
    if (data && data.myProfile && data.myProfile.avatar !== null) {
      setProfilePhoto(data.myProfile.avatar);
      firstName.setValueState(data.myProfile.firstName);
      lastName.setValueState(data.myProfile.lastName);
    }
  }, [data]);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.myProfile) {
    return (
      <EditContainer>
        <EditBox>
          <AvatarField>
            <ProfileImageInput
              fileUrl={profilePhoto}
              uploading={uploading}
              onChange={onPhotoChange}
            />
            <Horizontal>
              <Text>사진 ☝ 변경하기</Text>
            </Horizontal>
          </AvatarField>
          <MetaField>
            <Column>
              <Text>성(First Name)</Text>
              <Textarea
                placeholder={"성"}
                value={firstName.valueState}
                onChange={firstName.onChange}
              />
            </Column>
            <Column>
              <Text>이름(Last Name)</Text>
              <Textarea
                placeholder={"이름"}
                value={lastName.valueState}
                onChange={lastName.onChange}
              />
            </Column>
            <Column>
              <SubmitButton onClick={onClickEdit}>수정</SubmitButton>
            </Column>
          </MetaField>
        </EditBox>
      </EditContainer>
    );
  } else {
    return null;
  }
};

export default Edit;
