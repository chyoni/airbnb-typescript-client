import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "src/Components/Input";
import useInput from "src/Hooks/useInput";
import Button from "src/Components/Button";
import Theme from "src/Styles/Theme";
import { useMutation } from "react-apollo-hooks";
import {
  REQUEST_SECRET,
  CONFIRM_SECRET,
  CREATE_ACCOUNT
} from "src/Queries.queries";
import {
  requestSecretVariables,
  requestSecret,
  confirmSecretVariables,
  confirmSecret,
  createAccount,
  createAccountVariables
} from "src/types/api";
import { toast } from "react-toastify";
import { LOG_IN } from "src/LocalQueries";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
`;
const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  width: 120px;
  height: 120px;
`;
const LogoText = styled.span`
  font-size: 40px;
  font-family: "Righteous", cursive;
  font-weight: 600;
  color: ${props => props.theme.redColor};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 10px;
  }
`;
const Meta = styled.span`
  font-size: 17px;
  color: ${props => props.theme.greyColor};
  font-weight: 600;
  margin-bottom: 20px;
`;
const ToggleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;
const Toggle = styled.span`
  font-size: 17px;
  margin-left: 15px;
  cursor: pointer;
  color: ${props => props.theme.redColor};
`;

const Auth: React.SFC = () => {
  const logInEmail = useInput("");
  const signupEmail = useInput("");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const loginSecret = useInput("");
  const [auth, setAuth] = useState("login");
  const requestSecretMutation = useMutation<
    requestSecret,
    requestSecretVariables
  >(REQUEST_SECRET, {
    variables: { email: logInEmail.valueState }
  });
  const confirmSecretMutation = useMutation<
    confirmSecret,
    confirmSecretVariables
  >(CONFIRM_SECRET, {
    variables: {
      email: logInEmail.valueState,
      loginSecret: loginSecret.valueState
    }
  });
  const createAccountMutation = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT, {
    variables: {
      username: username.valueState,
      email: signupEmail.valueState,
      firstName: firstName.valueState,
      lastName: lastName.valueState
    }
  });
  const logInMutation = useMutation(LOG_IN);
  const handleRequestSecret = async (): Promise<void> => {
    const logInEmailValue = logInEmail.valueState;
    if (logInEmailValue !== "") {
      const [requestSecretFn, { loading }] = requestSecretMutation;
      const { data } = await requestSecretFn();
      if (!loading && data && data.requestSecret) {
        if (data.requestSecret.ok) {
          toast.success("시크릿 키를 보냈습니다 메일을 확인해 주세요 😊");
          setAuth("confirm");
        } else {
          toast.error(data.requestSecret.error);
        }
      } else {
        toast.error("잠시후 다시 시도해주세요 😥");
      }
    } else {
      toast.error("이메일 주소를 입력하세요 🙄🙄");
    }
  };
  const handleLogIn = async (): Promise<void> => {
    const loginSecretValue = loginSecret.valueState;
    if (loginSecretValue !== "") {
      const [confirmSecretFn, { loading }] = confirmSecretMutation;
      const { data } = await confirmSecretFn();
      if (!loading && data && data.confirmSecret) {
        if (data.confirmSecret.ok) {
          if (data.confirmSecret.token) {
            const [logInFn] = logInMutation;
            logInFn({ variables: { token: data.confirmSecret.token } });
            window.location.reload();
          } else {
            toast.error(data.confirmSecret.error);
          }
        } else {
          toast.error(data.confirmSecret.error);
        }
      } else {
        toast.error("일시적 오류입니다 😥");
      }
    } else {
      toast.error("시크릿 키를 입력해주세요 🙄🙄");
    }
  };
  const handleSignUp = async (): Promise<void> => {
    const signupEmailValue = signupEmail.valueState;
    const usernameValue = username.valueState;
    const firstNameValue = firstName.valueState;
    const lastNameValue = lastName.valueState;
    if (
      signupEmailValue === "" ||
      usernameValue === "" ||
      firstNameValue === "" ||
      lastNameValue === ""
    ) {
      toast.error("모든 항목은 필수사항이에요 🙄🙄");
    } else {
      const [createAccoutFn, { loading }] = createAccountMutation;
      const { data } = await createAccoutFn();
      if (!loading && data && data.createAccount) {
        if (data.createAccount.ok) {
          toast.success("회원가입이 완료되었습니다 😘");
          setTimeout(() => {
            setAuth("login");
          }, 1500);
        } else {
          toast.error(data.createAccount.error);
        }
      } else {
        toast.error("일시적 오류입니다 😥");
      }
    }
  };
  const toggleAuth = (): void => {
    if (auth === "login") {
      setAuth("signup");
    } else {
      setAuth("login");
    }
  };
  return (
    <Container>
      <Helmet>
        <title>로그인 | WoniBnB</title>
      </Helmet>
      <AuthBox>
        <Header>
          <Logo src={require("../Images/logo.png")} />
          <LogoText>WoniBnB</LogoText>
          <Logo src={require("../Images/logo.png")} />
        </Header>
        <Body>
          {auth === "signup" ? (
            <Form>
              <Meta>모든 사항은 필수요소에요 🙂</Meta>
              <Input
                width={"390px"}
                placeholder={"이메일 주소(Email)"}
                value={signupEmail.valueState}
                onChange={signupEmail.onChange}
              />
              <Input
                width={"390px"}
                placeholder={"닉네임(Username)"}
                value={username.valueState}
                onChange={username.onChange}
              />
              <Input
                width={"390px"}
                placeholder={"성(first Name)"}
                value={firstName.valueState}
                onChange={firstName.onChange}
              />
              <Input
                width={"390px"}
                placeholder={"이름(last Name)"}
                value={lastName.valueState}
                onChange={lastName.onChange}
              />
              <Button
                width={"390px"}
                color={Theme.redColor}
                text={"회원가입"}
                onClick={handleSignUp}
              />
            </Form>
          ) : auth === "login" ? (
            <Form>
              <Meta>간편히 시크릿 키만을 요청하세요 😊</Meta>
              <Input
                width={"390px"}
                placeholder={"이메일 주소(Email)"}
                value={logInEmail.valueState}
                onChange={logInEmail.onChange}
              />
              <Button
                width={"390px"}
                color={Theme.redColor}
                text={"시크릿 키 요청"}
                onClick={handleRequestSecret}
              />
            </Form>
          ) : (
            <Form>
              <Input
                width={"390px"}
                placeholder={"시크릿 키(loginSecret)"}
                value={loginSecret.valueState}
                onChange={loginSecret.onChange}
              />
              <Button
                width={"390px"}
                color={Theme.greenColor}
                text={"로그인"}
                onClick={handleLogIn}
              />
            </Form>
          )}
          {auth !== "confirm" && auth === "login" && (
            <ToggleBox>
              계정이 없으신가요? 가입하시겠어요? 😍
              <Toggle onClick={toggleAuth}>회원가입</Toggle>
            </ToggleBox>
          )}
          {auth !== "confirm" && auth === "signup" && (
            <ToggleBox>
              계정이 있으신가요? 로그인하세요 😘
              <Toggle onClick={toggleAuth}>로그인</Toggle>
            </ToggleBox>
          )}
        </Body>
      </AuthBox>
    </Container>
  );
};

export default Auth;
