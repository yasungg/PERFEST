import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import kakaoButton from "../images/kakaoButton.png";
import test from "../images/test.jpg";
import LoginAPI from "../api/LoginAPI";
import SignupAPI from "../api/SignupAPI";
import LoginModal from "../utils/LoginModal";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
const LoginInputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background: #ddd;
  border-radius: 5px;
  border: none;
  background: #ddd;
  margin-bottom: 16px;
  @media screen and (max-width: 769px) {
    width: 90%;
    align-self: center;
  }
`;
const LoginInputBox = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: ${(props) => props.height};
  background: #ddd;
  border-radius: 5px;
  border: none;
  background: transparent;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
  &:active {
    background: transparent;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    align-self: center;
  }
`;
const SignUpInputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background-color: white;
  box-shadow: 2px 5px 10px black;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  margin-bottom: 16px;
  @media screen and (max-width: 769px) {
    width: 90%;
    align-self: center;
  }
`;
const SignUpInputBox = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: ${(props) => props.height};
  background-color: white;
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
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  .regex {
    display: block;
    font-size: 16px;
    margin-right: 8px;
    color: ${(props) => props.fontColor};
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
  background: #222;
  box-shadow: 1px 2px 5px #222;
  transition: all 0.1s ease-in;
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background: royalblue;
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
  const REDIRECT_URI = "http://13.125.132.119:8111/koauth/login/kakao";
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

  //regex 컨트롤용 useState
  const [siugnupEmailRegexOpen, setSiugnupEmailRegexOpen] = useState("none");
  const [signupEmailRegex, setSignupEmailRegex] = useState(false);
  const [signupPasswordRegex, setSignupPasswordRegex] = useState(false);
  const [siugnupPasswordRegexOpen, setSiugnupPasswordRegexOpen] =
    useState("none");

  const [loginPasswordRegex, setLoginPasswordRegex] = useState(false);
  const [loginEmailRegexOpen, setLoginEmailRegexOpen] = useState("none");
  const [loginEmailRegex, setLoginEmailRegex] = useState(false);
  const [loginPasswordRegexOpen, setLoginPasswordRegexOpen] = useState("none");

  //regex 유효성 검사를 자동으로 해주기 위한 useRef
  const inputRefs = {
    signupEmail: useRef(),
    signupPassword: useRef(),
    loginEmail: useRef(),
    loginPassword: useRef(),
  };
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

  // 회원가입 이메일 유효성 검사
  const emailCheck = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegex.test(email);

    setSiugnupEmailRegexOpen("flex");
    setSignupEmailRegex(isValidEmail);
  }, [email]);

  // 회원가입 비밀번호 유효성 검사
  const passwordCheck = useCallback(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

    const isValidPwd = passwordRegex.test(password);

    setSiugnupPasswordRegexOpen("flex");
    setSignupPasswordRegex(isValidPwd);
  }, [password]);
  // 로그인 이메일 유효성 검사
  const loginEmailCheck = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegex.test(loginEmail);

    setLoginEmailRegexOpen("flex");
    setLoginEmailRegex(isValidEmail);
  });
  // 로그인 비밀번호 유효성 검사
  const loginPasswordCheck = useCallback(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

    const isValidPassword = passwordRegex.test(loginPassword);

    setLoginPasswordRegexOpen("flex");
    setLoginPasswordRegex(isValidPassword);
  });

  const onClickLogin = () => {
    // 로그인 함수

    const loginResponse = LoginAPI.Login(loginEmail, loginPassword)
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("tokenExpiresIn", result.tokenExpiresIn);
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

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
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
            <SignUpInputDiv>
              <SignUpInputBox
                type="text"
                name="signUpMail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@example.com"
                height="32px"
                ref={inputRefs.signupEmail}
                onBlur={emailCheck}
              />
              {signupEmailRegex ? (
                <RegexResult fontColor="green" display={siugnupEmailRegexOpen}>
                  <CheckCircleIcon className="regex" />
                </RegexResult>
              ) : (
                <RegexResult fontColor="red" display={siugnupEmailRegexOpen}>
                  <CancelIcon className="regex" />
                </RegexResult>
              )}
            </SignUpInputDiv>
            <SignUpInputDiv>
              <SignUpInputBox
                type="password"
                name="signUpPassword"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="영문 대소문자 숫자 특수문자 포함 10자리 이상"
                height="32px"
                ref={inputRefs.signupPassword}
                onBlur={passwordCheck}
              />
              {signupPasswordRegex ? (
                <RegexResult
                  fontColor="green"
                  display={siugnupPasswordRegexOpen}
                >
                  <CheckCircleIcon className="regex" />
                </RegexResult>
              ) : (
                <RegexResult fontColor="red" display={siugnupPasswordRegexOpen}>
                  <CancelIcon className="regex" />
                </RegexResult>
              )}
            </SignUpInputDiv>
            <SignUpInputDiv>
              <SignUpInputBox
                type="text"
                name="name"
                value={memberName}
                onChange={(event) => setMemberName(event.target.value)}
                placeholder="이름을 입력하세요."
                height="32px"
              />
            </SignUpInputDiv>
            <SignUpInputDiv>
              <SignUpInputBox
                type="text"
                name="nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="닉네임을 입력하세요."
                height="32px"
              />
            </SignUpInputDiv>
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
              color="#222"
            >
              Log in
            </Logo>
          </LogoBox>
          <InputBoxContainer height="128px">
            <LoginInputDiv>
              <LoginInputBox
                type="email"
                name="mail"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                placeholder="이메일을 입력하세요."
                height="32px"
                ref={inputRefs.loginEmail}
                onBlur={loginEmailCheck}
              />
              {loginEmailRegex ? (
                <RegexResult fontColor="green" display={loginEmailRegexOpen}>
                  <CheckCircleIcon className="regex" />
                </RegexResult>
              ) : (
                <RegexResult fontColor="red" display={loginEmailRegexOpen}>
                  <CancelIcon className="regex" />
                </RegexResult>
              )}
            </LoginInputDiv>
            <LoginInputDiv>
              <LoginInputBox
                type="password"
                name="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="영문 대소문자 숫자 특수문자 포함 10자리 이상"
                height="32px"
                ref={inputRefs.loginPassword}
                onBlur={loginPasswordCheck}
              />
              {loginPasswordRegex ? (
                <RegexResult fontColor="green" display={loginPasswordRegexOpen}>
                  <CheckCircleIcon className="regex" />
                </RegexResult>
              ) : (
                <RegexResult fontColor="red" display={loginPasswordRegexOpen}>
                  <CancelIcon className="regex" />
                </RegexResult>
              )}
            </LoginInputDiv>
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
