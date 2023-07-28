import React, { useState, useEffect, useMemo, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import kakaoButton from "../images/kakaoButton.png";
import loginBackgroundImg from "../images/loginBackground.jpg";
import test from "../images/test.jpg";
import LoginAPI from "../api/LoginAPI";
import SignupAPI from "../api/SignupAPI";
import LoginModal from "../utils/LoginModal";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background-image: url(${test});
  overflow: hidden;
`;
// linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
const Box = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 464px;
  height: 600px;
  border-radius: 5px;
  background: transparent;
  background-size: cover;
  border: none;
  box-shadow: 3px 5px 10px black;
  overflow: hidden;
  @media screen and (max-width: 769px) {
    width: 80%;
    height: 70vh;
  }
  @media screen and (max-width: 415px) {
    height: 66vh;
  }
  @media screen and (max-width: 391px) {
    height: 70vh;
  }
  @media screen and (max-width: 376px) {
    width: 96%;
    height: 90vh;
  }
`;
const SignUpBox = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  align-items: center;
  width: 464px;
  height: 600px;
  border-radius: 5px;
  border: none;
  backdrop-filter: blur(20px);
  @media screen and (max-width: 769px) {
    width: 100%;
    height: 100%;
  }
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 464px;
  height: 1000px;
  border-radius: 60% / 10%;
  background: white;
  border: none;
  z-index: 9;
  transform: translateY(${(props) => props.transForm});
  transition: 0.3s ease-in-out;
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: 100%;
  border: none;
  height: ${(props) => props.height};
  border: none;
  border-radius: 5px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 32px;
  margin-top: ${(props) => props.marginTop};
  border-radius: 5px;
  border: none;
  font-size: ${(props) => props.scale};
  color: ${(props) => props.color};
  font-weight: bold;
  transform: translateY(${(props) => props.Ylocation});
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const SignUpLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 5px 10px 30px black; */
  width: 300px;
  height: 32px;
  margin-top: ${(props) => props.marginTop};
  border-radius: 5px;
  border: none;
  font-size: ${(props) => props.scale};
  color: ${(props) => props.color};
  font-weight: bold;
  transform: translateY(${(props) => props.Ylocation});
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const InputBoxContainer = styled.form`
  display: flex;
  flex-flow: column;
  width: 320px;
  height: ${(props) => props.height};
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;
const LoginInputBox = styled.input`
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background: #ddd;
  border-radius: 5px;
  border: none;
  background: #ddd;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    align-self: center;
  }
`;
const SignUpInputBox = styled.input`
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background-color: white;
  box-shadow: 2px 5px 10px black;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    align-self: center;
  }
`;
const RegexResult = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 16px;
  .regex {
    display: none;
    font-size: 14px;
    color: ${(props) => props.fontColor};
    margin: 0 8px 0 0;
    padding: 0;
  }
`;
const AdditionalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100px;
  div {
    width: 200px;
    height: 16px;
    font-size: 14px;
  }
`;
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: 16px 0 8px 0;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
  }
`;
const SignUpBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 20px black;
  width: 300px;
  height: 45px;
  margin: 16px 0 8px 0;
  border: none;
  border-radius: 5px;
  color: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  font-weight: bold;
  background: white;
  transition: 0.3s ease-in-out;
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background: transparent;
    color: black;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
  }
`;
const KakaoBtn = styled.button`
  border: none;
  background: none;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
  }
`;

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(UserContext);
  const REST_API_KEY = "86c9013e77a6aad5b8b2c49eddca45b7";
  const REDIRECT_URI = "http://localhost:8111/koauth/login/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;

  // 로그인 페이지 상태 결정을 위해 서버로부터 함께 전송된 파라미터
  const isKakao = searchParams.get("isKakao");
  const needSignup = searchParams.get("needSignup");
  //로그인 페이지 상태 변경을 위해 사용하는 useState
  const [loginBoxTransformY, setLoginBoxTransformY] = useState("-340px");
  const [loginLogoSize, setLoginLogoSize] = useState("64px");
  const [logoYLocation, setLogoYLocation] = useState("64px");
  const [signUpLogoSize, setSignUpLogoSize] = useState("24px");
  const [signUpLogoYLocation, setSignUpLogoYLocation] = useState("-48px");

  //회원가입 inputbox 입력용 useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberName, setMemberName] = useState("");
  const [nickname, setNickname] = useState("");

  //로그인 inputbox 입력용 useState
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const changeLoginForm = () => {
    setLoginBoxTransformY("-340px");
    setLoginLogoSize("64px");
    setLogoYLocation("64px");
    setSignUpLogoYLocation("-48px");
    setSignUpLogoSize("24px");
  };

  const changeSignUpForm = () => {
    setLoginBoxTransformY("100px");
    setLoginLogoSize("24px");
    setLogoYLocation("0px");
    setSignUpLogoYLocation("0");
    setSignUpLogoSize("64px");
  };

  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState("");
  const [header, setHeader] = useState("");

  const onClickSignup = (event) => {
    // 회원가입 inputbox에서 전달받은 value를 formData에 담아 axios로 전송하는 함수
    event.preventDefault();

    // 파라미터로 전달된 boolean isKakao에 따라 카카오 로그인 axios가 활성화될지 일반 로그인이 활성화될지 결정
    const response = isKakao
      ? SignupAPI.KakaoSignup(email, password, memberName, nickname)
      : SignupAPI.Signup(email, password, memberName, nickname);
    console.log(response);
    changeLoginForm();
  };

  const onClickLogin = () => {
    // 로그인 함수

    const loginResponse = LoginAPI.Login(loginEmail, loginPassword)
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("tokenExpiresIn", result.tokenExpiresIn);

        console.log(result.accessToken);
        console.log(result.tokenExpiresIn);
        console.log(localStorage.getItem("accessToken"));
        setIsLogin(true);
        navigate("/");
      })
      .catch((error) => {
        if (error) {
          console.error(error);
          setOpen(true);
          setChildren("로그인에 실패하였습니다!");
          setHeader("로그인 에러");
        }
      });
  };
  const onClickLogout = () => {
    const Logout = LoginAPI.Logout();
  };

  const closeModal = () => {
    setOpen(false);
  };

  useMemo(() => {
    // 전달받은 값에 따라 Login 페이지를 띄워줄지, Signup 페이지를 띄워줄지 결정함.
    needSignup ? changeSignUpForm() : changeLoginForm();
    setOpen(false);
  }, [needSignup]);

  return (
    <Container justifyContent="center" alignItems="center">
      <Box>
        <SignUpBox>
          <LogoBox height="192px" justifyContent="center">
            <SignUpLogo
              onClick={changeSignUpForm}
              scale={signUpLogoSize}
              Ylocation={signUpLogoYLocation}
              color="white"
            >
              Sign up
            </SignUpLogo>
          </LogoBox>
          <InputBoxContainer height="184px">
            <SignUpInputBox
              type="text"
              name="signUpMail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@example.com"
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <SignUpInputBox
              type="password"
              name="signUpPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <SignUpInputBox
              type="text"
              name="name"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}
              placeholder="이름을 입력하세요."
              height="32px"
            />
            <RegexResult />
            <SignUpInputBox
              type="text"
              name="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="닉네임을 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
          </InputBoxContainer>
          <SignUpBtn onClick={onClickSignup}>Sign up</SignUpBtn>
        </SignUpBox>
        <LoginBox transForm={loginBoxTransformY}>
          <LogoBox height="192px" justifyContent="flex-start">
            <Logo
              marginTop="8px"
              onClick={changeLoginForm}
              scale={loginLogoSize}
              Ylocation={logoYLocation}
              color="#302b63"
            >
              Log in
            </Logo>
          </LogoBox>
          <InputBoxContainer height="128px">
            <LoginInputBox
              type="email"
              name="mail"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              placeholder="이메일을 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <LoginInputBox
              type="password"
              name="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
          </InputBoxContainer>
          <LoginBtn onClick={onClickLogin}>
            <span>로그인</span>
          </LoginBtn>
          <KakaoBtn>
            <a href={KAKAO_AUTH_URI}>
              <img
                src={kakaoButton}
                alt=""
                style={{ width: "100%", height: "45px" }}
              />
            </a>
          </KakaoBtn>
          <AdditionalBox />
        </LoginBox>
      </Box>
      <LoginModal
        open={open}
        header={header}
        children={children}
        close={closeModal}
      />
    </Container>
  );
};
export default Login;
