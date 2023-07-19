import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 200px;
  height: calc(100vh - 60px);
  bottom: 0;
  left: ${(props) => props.left};
  background: #222;
  border: none;
  border-radius: 3px;
  box-shadow: 5px 10px 20px black;
  overflow: hidden;
  transition: all 0.5s ease-out;
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

const AdminFestivalSidebar = () => {
  const navigate = useNavigate();
  const {
    isAdminFestivalSidebar,
    setIsAdminFestivalSidebar,
    setFestivalOpacity,
    setSecondFestOpacity,
    setThirdFestOpacity,
    setForthFestOpacity,
  } = useContext(UserContext);
  const openFestivalList = () => {
    setFestivalOpacity("flex");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
  };
  const openChangeFestivalInfo = () => {
    setFestivalOpacity("none");
    setSecondFestOpacity("flex");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
  };
  const openFestivalTelInfo = () => {
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("flex");
    setForthFestOpacity("none");
  };
  const openFestReviewManagement = () => {
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("flex");
  };
  return (
    <SidebarContainer left={isAdminFestivalSidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsAdminFestivalSidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarNaviBtns>
        <SidebarNaviBtn onClick={openFestivalList}>
          <span className="sidenavispan">축제 목록</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openChangeFestivalInfo}>
          <span className="sidenavispan">축제 정보 변경 신청 목록</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openFestivalTelInfo}>
          <span className="sidenavispan">축제 관계자 연락처 일람</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openFestReviewManagement}>
          <span className="sidenavispan">축제 리뷰 관리</span>
        </SidebarNaviBtn>
      </SidebarNaviBtns>
    </SidebarContainer>
  );
};
export default AdminFestivalSidebar;
