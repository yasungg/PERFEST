import styled from "styled-components";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { UserContext } from "../context/UserStore";
import LoginAPI from "../api/LoginAPI";
import Timeline from "../pages/Timeline";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  height: 58px;
  background: white;
  border: none;
  z-index: 6;
  @media screen and (max-width: 767) {
    width: 100vw;
    max-width: 100%;
  }
`;
const PerfestLogo = styled.img`
  height: 100%;
  user-select: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;
const HeaderBody = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  width: 90%;
  height: 100%;
`;
const HeaderNaviButtons = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  width: 600px;
  height: 100%;
  @media screen and (max-width: 1025px) {
    display: none;
  }
`;
const HeaderNaviBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  width: 100px;
  height: 100%;
  color: black;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
    transform: translateX(-5px);
  }
`;
const UserBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 100%;
  background: transparent;
  margin: 0 30px 0 30px;
  @media screen and (max-width: 1025px) {
    display: none;
  }
  .userbox-button {
    display: flex;
    align-items: center;
    background: none;
    outline: none;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  .notification {
    margin-right: 8px;
  }
`;
const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 80%;
  border-radius: 5px;
  outline: none;
  border: none;
  background: black;
  color: white;
  font-weight: 300px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const HamburgerBtn = styled.button`
  display: none;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background: black;
  border: none;
  border-radius: 5px;
  margin: auto 12px auto 0;
  .menuIcon {
    transition: all 0.1s ease-in;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .menuIcon {
    transform: scale(1.2);
  }
  @media screen and (max-width: 1025px) {
    display: flex;
  }
`;
const NotiBtnForMobile = styled.button`
  display: none;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background: white;
  border: none;
  border-radius: 5px;
  margin: auto 12px auto 0;
  outline: none;
  .menuIcon {
    transition: all 0.1s ease-in;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .menuIcon {
    transform: scale(1.2);
  }
  @media screen and (max-width: 1025px) {
    display: flex;
  }
`;
const MypageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 80%;
  border-radius: 5px;
  outline: none;
  border: none;
  background: white;
  color: #222;
  font-weight: 300px;
  user-select: none;
  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateX(-5px);
  }
`;

const NotificationBox = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 400px;
  height: 60vh;
  top: ${(props) => props.top};
  right: 16px;
  background: white;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 3px 5px #222;
  padding: 8px;
  z-index: 5;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 767px) {
    width: calc(100vw - 32px);
    height: calc(100vh - 88px);
  }
`;
const Xbox = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;
const Xbtn = styled.button`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
  &:hover .xIcon {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;
const NotificationBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    position: fixed;
    right: -4px;
    width: 6px;
    background: white;
    border-radius: 2px;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
`;
const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setIsSidebar } = useContext(UserContext);
  const [notiboxMove, setNotiboxMove] = useState("-64vh");
  const [notiboxMoveMobile, setNotiboxMoveMobile] = useState("-100vh");
  const [mQuery, setMQuery] = useState(window.innerWidth < 769 ? true : false);

  //미디어 쿼리에 따른 컴포넌트 상태변화
  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };

  useEffect(() => {
    const mql = window.matchMedia("screen and (max-width: 769px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const logout = () => {
    const Logout = LoginAPI.Logout()
      .then((result) => {
        setIsLogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  useEffect(() => {
    return setIsSidebar("-300px");
  }, []);
  return (
    <HeaderContainer>
      <PerfestLogo src={BlackLogo} alt="" onClick={() => navigate("/")} />
      <HeaderBody>
        {/* <SearchBoxContainer> // 임시!!
          <SearchBox type="text" placeholder="축제를 찾아보세요!" />
          <SearchIcon style={{ color: "white" }} />
        </SearchBoxContainer> */}
        <HeaderNaviButtons>
          <HeaderNaviBtn onClick={() => navigate("/pages/festival")}>
            <span>Festivals</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn onClick={() => navigate("/pages/ranking")}>
            <span>Ranking</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn onClick={() => navigate("/pages/board")}>
            <span>Community</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn onClick={() => navigate("/pages/Calender")}>
            <span>Calender</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn>
            <span>About</span>
          </HeaderNaviBtn>
        </HeaderNaviButtons>
        <UserBox>
          {isLogin ? (
            <>
              <MypageButton onClick={() => navigate("/pages/mypage")}>
                MY PAGE
              </MypageButton>
              {mQuery ? (
                <button
                  className="userbox-button notification"
                  onClick={() => setNotiboxMoveMobile("6vh")}
                >
                  <NotificationsIcon style={{ color: "#222" }} />
                </button>
              ) : (
                <button
                  className="userbox-button notification"
                  onClick={() => setNotiboxMove("74px")}
                >
                  <NotificationsIcon style={{ color: "#222" }} />
                </button>
              )}
              <button className="userbox-button" onClick={logout}>
                <LogoutIcon />
              </button>
            </>
          ) : (
            <LoginButton onClick={() => navigate("/pages/login")}>
              <span>Login / Signup</span>
            </LoginButton>
          )}
        </UserBox>
        {isLogin && mQuery && (
          <NotiBtnForMobile onClick={() => setNotiboxMoveMobile("6vh")}>
            <NotificationsIcon style={{ color: "#222" }} />
          </NotiBtnForMobile>
        )}
        <HamburgerBtn onClick={() => setIsSidebar("-2px")}>
          <MenuIcon className="menuIcon" style={{ color: "white" }} />
        </HamburgerBtn>
      </HeaderBody>
      {mQuery ? (
        <NotificationBox top={notiboxMoveMobile}>
          <Xbox>
            <FiberNewIcon style={{ fontSize: "24px" }} />
            <Xbtn onClick={() => setNotiboxMoveMobile("-100vh")}>
              <CloseIcon className="xIcon" style={{ fontSize: "16px" }} />
            </Xbtn>
          </Xbox>
          <NotificationBody>
            <Timeline />
          </NotificationBody>
        </NotificationBox>
      ) : (
        <NotificationBox top={notiboxMove}>
          <Xbox>
            <FiberNewIcon style={{ fontSize: "24px" }} />
            <Xbtn onClick={() => setNotiboxMove("-62vh")}>
              <CloseIcon className="xIcon" style={{ fontSize: "16px" }} />
            </Xbtn>
          </Xbox>
          <NotificationBody>
            <Timeline />
          </NotificationBody>
        </NotificationBox>
      )}
    </HeaderContainer>
  );
};
export default Header;
