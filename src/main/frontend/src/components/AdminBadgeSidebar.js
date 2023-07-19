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
const AdminBadgeSidebar = () => {
  const navigate = useNavigate();
  const {
    isAdminBadgeSidebar,
    setIsAdminBadgeSidebar,
    setBadgeOpacity,
    setApproveBadge,
  } = useContext(UserContext);

  const openBadgeManage = () => {
    setBadgeOpacity("flex");
    setApproveBadge("none");
  };
  const openApproveBadge = () => {
    setBadgeOpacity("none");
    setApproveBadge("flex");
  };
  return (
    <SidebarContainer left={isAdminBadgeSidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsAdminBadgeSidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarNaviBtns>
        <SidebarNaviBtn onClick={openBadgeManage}>
          <span className="sidenavispan">회원 뱃지 관리</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openApproveBadge}>
          <span className="sidenavispan">뱃지 심사/승인</span>
        </SidebarNaviBtn>
        {/* <SidebarNaviBtn>
          <span className="sidenavispan">About</span>
        </SidebarNaviBtn> */}
      </SidebarNaviBtns>
    </SidebarContainer>
  );
};
export default AdminBadgeSidebar;
