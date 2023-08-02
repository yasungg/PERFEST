import styled from "styled-components";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserContext } from "../context/UserStore";
import LoginAPI from "../api/LoginAPI";
import Timeline from "../pages/Timeline";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 58px;
  background: white;
  border: none;
  z-index: 6;
  @media screen and (max-width: 767px) {
    justify-content: flex-start;
    position: fixed;
    top: 8;
    width: 100vw;
    height: 6vh;
    z-index: 99;
    background: transparent;
  }
`;
const PerfestLogo = styled.img`
  height: 100%;
  user-select: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const HeaderBody = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  width: 90%;
  height: 100%;
  @media screen and (max-width: 767px) {
    justify-content: space-between;
    width: 100%;
  }
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
  .logout-button {
    display: flex;
    align-items: center;
    background: none;
    outline: none;
    border: none;
    &:hover {
      cursor: pointer;
    }
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
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #222;
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
  @media screen and (max-width: 767px) {
    box-shadow: 2px 3px 5px #222;
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 375px) {
    width: 32px;
    height: 32px;
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
const SearchBoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 10px;
  height: 80%;
  border-radius: 10px;
  background: white;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease-in;
  align-self: center;
  margin-left: 12px;
  box-shadow: 3px 5px 10px #222;
  @media screen and (max-width: 767px) {
    width: 80%;
    opacity: 1;
    justify-content: space-between;
  }
`;
const SearchBox = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 80%;
  margin: 0 10px;
  padding: 10px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: #222;
  font-size: 14px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;
const NotiBtn = styled.button`
  display: flex;
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
const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  width: auto;
  height: auto;
  background: transparent;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
  &:hover .searchIcon {
    transform: scale(1.1);
    transition: all 0.1s ease-in;
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
`;

const HeaderForFestival = () => {
  const navigate = useNavigate();
  const {
    isLogin,
    setIsLogin,
    setIsSidebar,
    setSearchBoxMove,
    setContextFestivalSearch,
  } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const [notiboxMove, setNotiboxMove] = useState("-100vh");
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

  const onClickSearch = () => {
    setSearchBoxMove("0");
    setContextFestivalSearch(keyword);
  };

  useEffect(() => {
    return setIsSidebar("-300px");
  }, []);
  return (
    <HeaderContainer>
      <PerfestLogo src={BlackLogo} alt="" onClick={() => navigate("/")} />
      <HeaderBody>
        <SearchBoxContainer>
          <SearchBox
            type="text"
            placeholder="축제를 찾아보세요!"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton onClick={onClickSearch}>
            <SearchIcon className="searchIcon" style={{ color: "#222" }} />
          </SearchButton>
        </SearchBoxContainer>
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
              <NotiBtn onClick={() => setNotiboxMove("74px")}>
                <NotificationsIcon style={{ color: "#222" }} />
              </NotiBtn>
              <button className="logout-button" onClick={logout}>
                <LogoutIcon />
              </button>
            </>
          ) : (
            <LoginButton onClick={() => navigate("/pages/login")}>
              <span>Login / Signup</span>
            </LoginButton>
          )}
        </UserBox>
        <HamburgerBtn onClick={() => setIsSidebar("-2px")}>
          <MenuIcon className="menuIcon" style={{ color: "white" }} />
        </HamburgerBtn>
      </HeaderBody>
      <NotificationBox top={notiboxMove}>
        <Xbox>
          <FiberNewIcon style={{ fontSize: "24px" }} />
          <Xbtn onClick={() => setNotiboxMove("-100vh")}>
            <CloseIcon className="xIcon" style={{ fontSize: "16px" }} />
          </Xbtn>
        </Xbox>
        <NotificationBody>
          <Timeline />
        </NotificationBody>
      </NotificationBox>
    </HeaderContainer>
  );
};
export default HeaderForFestival;
