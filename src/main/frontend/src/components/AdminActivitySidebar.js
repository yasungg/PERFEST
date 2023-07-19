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

const AdminActivitySidebar = () => {
  const navigate = useNavigate();
  const {
    isAdminActivitySidebar,
    setIsAdminActivitySidebar,
    setProgramOpacity,
    setRequestProgram,
    setPurchaseProgram,
    setRefundProgram,
    setProgramReview,
  } = useContext(UserContext);

  const openProgramList = () => {
    setProgramOpacity("flex");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
  };
  const openRequestProgram = () => {
    setProgramOpacity("none");
    setRequestProgram("flex");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
  };
  const openPurchaseProgram = () => {
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("flex");
    setRefundProgram("none");
    setProgramReview("none");
  };
  const openRefundProgram = () => {
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("flex");
    setProgramReview("none");
  };
  const openProgramReview = () => {
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("flex");
  };
  return (
    <SidebarContainer left={isAdminActivitySidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsAdminActivitySidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarNaviBtns>
        <SidebarNaviBtn onClick={openProgramList}>
          <span className="sidenavispan">전체 프로그램 목록</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openRequestProgram}>
          <span className="sidenavispan">프로그램 신청 관리</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openPurchaseProgram}>
          <span className="sidenavispan">프로그램 결제 내역</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openRefundProgram}>
          <span className="sidenavispan">프로그램 환불 내역</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openProgramReview}>
          <span className="sidenavispan">프로그램 후기 관리</span>
        </SidebarNaviBtn>
      </SidebarNaviBtns>
    </SidebarContainer>
  );
};
export default AdminActivitySidebar;
