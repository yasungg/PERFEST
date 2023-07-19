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
const AdminMemberSidebar = () => {
  const navigate = useNavigate();
  const {
    isAdminMemberSidebar,
    setIsAdminMemberSidebar,
    setMemberOpacity,
    setBoardOpacity,
    setReportOpacity,
    setCommentOpacity,
  } = useContext(UserContext);

  const openMembershipManagement = () => {
    setMemberOpacity("flex");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("none");
  };
  const openBoardManagement = () => {
    setMemberOpacity("none");
    setBoardOpacity("flex");
    setReportOpacity("none");
    setCommentOpacity("none");
  };
  const openCommentManagement = () => {
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("flex");
  };
  const openReportManagement = () => {
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("flex");
    setCommentOpacity("none");
  };
  return (
    <SidebarContainer left={isAdminMemberSidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsAdminMemberSidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarNaviBtns>
        <SidebarNaviBtn onClick={openMembershipManagement}>
          <span className="sidenavispan">회원 관리</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openBoardManagement}>
          <span className="sidenavispan">게시글 관리</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openCommentManagement}>
          <span className="sidenavispan">댓글 관리</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openReportManagement}>
          <span className="sidenavispan">문의 / 신고</span>
        </SidebarNaviBtn>
      </SidebarNaviBtns>
    </SidebarContainer>
  );
};
export default AdminMemberSidebar;
