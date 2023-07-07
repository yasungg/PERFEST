import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Profile from "../images/47802_35328_56.jpg";
import MySetting from "./MySetting";
import MyReview from "./MyReview";
import MyReserveList from "./MyReserveList";
import MyPayList from "./MyPayList";
import MyWrite from "./MyWrite";
import MyRanking from "./MyRanking";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

// 사이드바 펼치기 애니메이션
const expandSidebarAnimation = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 300px;
  }
`;

// 사이드바 접기 애니메이션
const collapseSidebarAnimation = keyframes`
  from {
    width: 300px;
  }

  to {
    width: 100%;
  }
`;

// 사이드바 메뉴 이동
const slideMenuAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;


// 사이드바 영역
const SideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #2f4050;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  transition: transform 0.3s;
  transform: translateX(${(props) => (props.collapsed ? "20%" : "0")});

  @media (min-width: 768px) {
    width: 300px;
    transform: translateX(0);
  }
`;


// 프로필 이미지
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

// 닉네임
const Nickname = styled.span`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 메뉴 컨테이너
const Menu = styled.div`
  padding: 0;
`;

// 메뉴 아이템
const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #293846;
  }

  &.active {
    background-color: #293846;
  }
`;

// 메뉴 링크
const MenuLink = styled.div`
  color: white;
  transition: transform 0.3s;
  transform: ${(props) => (props.collapsed ? "translateX(-100%)" : "translateX(0)")};

  &:hover {
    transform: ${(props) => (props.collapsed ? "translateX(-100%)" : "translateX(-10px)")};
  }
`;


// 컨텐츠 영역
const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const MyPage = () => {
  const memberNickname = "잼뮈"; // 회원닉 가져올 예정

  const menus = [
    { name: "내 정보", path: "/MySetting" },
    { name: "내 리뷰", path: "/MyReview" },
    { name: "예약 목록", path: "/MyReserveList" },
    { name: "주문 내역", path: "/MyPayList" },
    { name: "내 게시글", path: "/MyWrite" },
    { name: "내 랭킹", path: "/MyRanking" }
  ];
    
    const [selectedMenu, setSelectedMenu] = useState("");
    
    const handleMenuClick = (path) => {
      if (selectedMenu !== path) {
        setSelectedMenu(path);
      } else {
        setSelectedMenu("");
      }
    };
    
    return (
      <Container>
        <SideBarWrapper collapsed={selectedMenu !== ""} className={selectedMenu !== "" ? "menuSlide" : ""}>
          <ProfileImage src={Profile} alt="Profile" />
            <Nickname>{memberNickname} 님</Nickname>
            <Menu>
              {menus.map((menu, index) => (
                <MenuItem key={index}>
                  <MenuLink
                    className={selectedMenu === menu.path ? "active" : ""}
                    onClick={() => handleMenuClick(menu.path)}
                  >
                  {menu.name}
              </MenuLink>
            </MenuItem>
    ))}
    </Menu>
     </SideBarWrapper>
       <ContentWrapper>
          {selectedMenu === "/MySetting" && <MySetting />}
          {selectedMenu === "/MyReview" && <MyReview />}
          {selectedMenu === "/MyReserveList" && <MyReserveList />}
          {selectedMenu === "/MyPayList" && <MyPayList />}
          {selectedMenu === "/MyWrite" && <MyWrite />}
          {selectedMenu === "/MyRanking" && <MyRanking />}
      </ContentWrapper>
    </Container>
    );
  };
    
    export default MyPage;
