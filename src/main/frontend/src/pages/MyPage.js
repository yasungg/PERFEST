import React, { useEffect, useState } from "react";
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
  position: relative;
  width: 100%;
  height: 100vh;
`;

// 사이드바 영역
const SideBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.collapsed ? "0" : "20%")};
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  opacity: ${(props) => (props.collapsed ? "0" : "1")};
  transition: width 0.3s, opacity 0.3s;
  z-index: 1;

  @media (max-width: 1024px) {
    width: ${(props) => (props.collapsed ? "0" : "80%")};
    opacity: ${(props) => (props.collapsed ? "0" : "1")};
    transition: width 0.3s, opacity 0.3s;
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
`;

const HamburgerIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

// 컨텐츠 영역
const ContentWrapper = styled.div`
  width: calc(100% - 300px);
  transform: translateX(300px);
  padding: 20px;
  position: relative; /* 컨텐츠 영역도 z-index를 적용하기 위해 상대적 위치 지정 */
  z-index: 0;
  @media screen and (max-width: 1025px) {
    width: 100%;
    transform: translateX(0);
  }
`;

const MyPage = () => {
  const memberNickname = "OO"; // 회원닉 가져올 예정
  const menus = [
      { name: "내 정보", path: "/MySetting" },
      { name: "내 리뷰", path: "/MyReview" },
      { name: "예약 목록", path: "/MyReserveList" },
      { name: "주문 내역", path: "/MyPayList" },
      { name: "내 활동", path: "/MyWrite" },
      { name: "내 랭킹", path: "/MyRanking" }
    ];

    const [selectedMenu, setSelectedMenu] = useState("/MySetting");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024);
        setSidebarCollapsed(true); // 모바일 화면에서는 처음에 사이드바를 감추도록 수정
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [selectedMenu]);

    const handleMenuClick = (path) => {
      if (isMobile) {
        setSelectedMenu(path);
        setSidebarCollapsed(true); // 메뉴 클릭 시 모바일 화면에서는 사이드바를 감추도록 수정
      } else {
        if (selectedMenu !== path) {
          setSelectedMenu(path);
        } else {
          setSelectedMenu("");
        }
      }
    };

    const handleHamburgerClick = () => {
      setSidebarCollapsed(!sidebarCollapsed);
      if (!sidebarCollapsed) {
        const menuPath = menus[0].path;
        handleMenuClick(menuPath);
      }
    };

    return (
      <Container>
        <SideBarWrapper collapsed={sidebarCollapsed}>
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
        {isMobile && (
          <HamburgerIcon onClick={handleHamburgerClick}>
            &#9776;
          </HamburgerIcon>
        )}
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
