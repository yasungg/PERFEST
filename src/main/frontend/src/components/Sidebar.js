import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import PerfestLogoWhite from "../images/PERFEST LOGO WHITE.png";
import { useNavigate } from "react-router-dom";
import LoginAPI from "../api/LoginAPI";
const SidebarContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 300px;
  height: 100%;
  top: 0;
  right: ${(props) => props.right};
  background: #222;
  border: none;
  border-radius: 3px;
  /* box-shadow: 5px 10px 20px black; */
  z-index: 99;
  overflow: hidden;
  transition: all 0.5s ease-out;
  @media screen and (min-width: 1025px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    position: fixed;
  }
`;
const SidebarXbox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: transparent;
`;
const SidebarXbtn = styled.button`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
  &:hover .xIcon {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;
const SidebarProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 348px;
  background: white;
  border: none;
`;
const SidebarProfileImg = styled.img`
  width: 268px;
  height: 268px;
  background: #222;
  margin: 16px 0 16px 0;
  border: none;
  border-radius: 5px;
`;
const MemberBox = styled.div`
  display: flex;
  margin: 0 16px 0 16px;
  width: calc(100% - 32px);
  height: 48px;
  border: none;
`;
const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80%;
  border-radius: 5px;
  outline: none;
  border: none;
  margin: 0 auto;
  background: #222;
  color: white;
  font-weight: 300px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const SidebarNaviBtns = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const SidebarNaviBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 80px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: #222;
    background: white;
  }
  &:hover .sidenavispan {
    transform: translateX(-5px);
    transition: 0.2s ease-in-out;
  }
`;
const LogoutBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 100%;
  min-height: 40px;
  outline: none;
  border: none;
  margin: 0 auto;
  background: #222;
  color: white;
  font-weight: 600;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: #222;
    background: white;
  }
  &:hover .sidenavispan {
    transform: translateX(-5px);
    transition: 0.2s ease-in-out;
  }
`;
const SidebarBodyContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 300px;
  height: calc(100vh - 40px);
  background: transparent;
  border: none;
  overflow-y: scroll;
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
    width: 6px;
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
`;
const Sidebar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, isSidebar, setIsSidebar } =
    useContext(UserContext);
  const [sidebarName, setSidebarName] = useState("");

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
  return (
    <SidebarContainer right={isSidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsSidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarBodyContainer>
        <SidebarProfile>
          <SidebarProfileImg src={PerfestLogoWhite} />
          <MemberBox>
            {isLogin ? (
              <LoginButton onClick={() => navigate("/pages/mypage")}>
                <span>MYPAGE</span>
              </LoginButton>
            ) : (
              <LoginButton onClick={() => navigate("/pages/login")}>
                <span>Login / Signup</span>
              </LoginButton>
            )}
          </MemberBox>
        </SidebarProfile>
        <SidebarNaviBtns>
          <SidebarNaviBtn onClick={() => navigate("/pages/festival")}>
            <span className="sidenavispan">Festivals</span>
          </SidebarNaviBtn>
          <SidebarNaviBtn>
            <span className="sidenavispan">Ranking</span>
          </SidebarNaviBtn>
          <SidebarNaviBtn onClick={() => navigate("/pages/board")}>
            <span className="sidenavispan">Community</span>
          </SidebarNaviBtn>
          <SidebarNaviBtn onClick={() => navigate("/pages/Calender")}>
            <span className="sidenavispan">Calender</span>
          </SidebarNaviBtn>
          <SidebarNaviBtn>
            <span className="sidenavispan">About</span>
          </SidebarNaviBtn>
        </SidebarNaviBtns>
        {isLogin && <LogoutBtn onClick={logout}>LOG OUT</LogoutBtn>}
      </SidebarBodyContainer>
    </SidebarContainer>
  );
};
export default Sidebar;
