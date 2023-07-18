import styled from "styled-components";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import WhiteLogo from "../images/PERFEST LOGO WHITE.png";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../context/UserStore";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 58px;
  background: white;
  border: none;
//  position: fixed;
//  top: 0;
//  z-index: 99;
`;
const PerfestLogo = styled.img`
  height: 100%;
  user-select: none;
  z-index: 100;
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
const HeaderNaviButtons = styled.div`
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
  justify-content: space-around;
  align-items: center;
  width: 180px;
  height: 100%;
  background: transparent;
  margin: 0 30px 0 30px;
  @media screen and (max-width: 1025px) {
    display: none;
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
// const SearchBoxContainer = styled.div` 임시!!
//   display: flex;
//   box-sizing: border-box;
//   width: 320px;
//   height: 80%;
//   border-radius: 10px;
//   border: none;
//   background: transparent;
//   align-items: center;
//   align-self: center;
// `;
// const SearchBox = styled.input`
//   box-sizing: border-box;
//   width: 80%;
//   height: 80%;
//   margin: 0 10px;
//   padding: 10px;
//   border-radius: 10px;
//   background: transparent;
//   border: 1px solid white;
//   color: white;
//   font-size: 16px;
//   &:focus {
//     outline: none;
//   }
// `;
const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsSidebar } = useContext(UserContext);
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
          <HeaderNaviBtn>
            <span>Ranking</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn onClick={() => navigate("/pages/board")}>
            <span>Community</span>
          </HeaderNaviBtn>
          <HeaderNaviBtn>
            <span>About</span>
          </HeaderNaviBtn>
        </HeaderNaviButtons>
        <UserBox>
          {isLogin ? (
            <span>곽용석님 안녕하세요.</span>
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
    </HeaderContainer>
  );
};
export default Header;
