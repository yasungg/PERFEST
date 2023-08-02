import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import profileImage from "../images/profileImage.jpg";
import MySetting from "./MySetting";
import MyReview from "./MyReview";
import MyReserveList from "./MyReserveList";
import MyPayList from "./MyPayList";
import MyWrite from "./MyWrite";
import MyRanking from "./MyRanking";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MemberAPI from "../api/MemberAPI";

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

const Profilebox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 160px;
height: 160px;
border-radius: 50%;
margin-bottom: 10px;
overflow: hidden;
`

// 프로필 이미지
const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .1s ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
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
  const inputRef = useRef(null);
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
    const storage = getStorage();
    const [uploadedImage, setUploadedImage] = useState("");
    const [nickNameInfo, setNickNameInfo] = useState("");
    const [profile, setProfile] = useState("");
    const [profileUpdateTrigger, setProfileUpdateTrigger] = useState(false);
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
    const firebaseConfig = {
      apiKey: "AIzaSyBaDK9wBsy7cj-T1IiIiShSICh4N9S2VCw",
      authDomain: "perfest-e2b99.firebaseapp.com",
      projectId: "perfest-e2b99",
      storageBucket: "perfest-e2b99.appspot.com",
      messagingSenderId: "17333976746",
      appId: "1:17333976746:web:74e33ff543b275ad5e9ad3",
      measurementId: "G-MCWXMQSVDT"
    };
  initializeApp(firebaseConfig);

  
  const handleProfileImageClick = () => {
    // input 요소의 클릭 이벤트를 트리거합니다.
    inputRef.current.click();
  };
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const storageRef = ref(storage, "Image");
            const fileRef = ref(storageRef, file.name);

            await uploadBytes(fileRef, file);

            const downloadURL = await getDownloadURL(fileRef);
            setTimeout(async () => {
              const response = await MemberAPI.updateImg(downloadURL);
              if (response.data === true){
              setUploadedImage(response.data);
              setProfileUpdateTrigger(prev => !prev)
            } else {
              }
            }, 1000); 
            }
            
      };
      useEffect(() => {
      const getProfileImage = async() => {
        const response = await MemberAPI.getProfileImg();
        if(response.status === 200) {
          setProfile(response.data);
        }
      }
      getProfileImage();
      },[profileUpdateTrigger]);
       // 회원 조회
      useEffect(() => {
      const memberInfo = async() => {
      const rsp = await MemberAPI.getMemberNickName();
      if(rsp.status === 200) setNickNameInfo(rsp.data);
      };
      memberInfo();
      },[]);
    return (
      <Container>
        <SideBarWrapper collapsed={sidebarCollapsed}>
          <Profilebox>
        {profile ? 
        (<ProfileImage
          src={profile}
          onClick={handleProfileImageClick}
        />)
        :
        (<ProfileImage
          src={profileImage}
          onClick={handleProfileImageClick}
        />)}
        {/* 숨겨진 input 요소 추가 */}
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        </Profilebox>
          <Nickname>{nickNameInfo}님</Nickname>
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
