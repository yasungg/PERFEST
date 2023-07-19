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

const AdminProductSidebar = () => {
  const navigate = useNavigate();
  const {
    isAdminProductSidebar,
    setIsAdminProductSidebar,
    setProductOpacity,
    setProductStatisticsOpacity,
    setProductPurchase,
    setProductRefund,
  } = useContext(UserContext);

  const openProductList = () => {
    setProductOpacity("flex");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("none");
  };
  const openStatistics = () => {
    setProductOpacity("none");
    setProductStatisticsOpacity("flex");
    setProductPurchase("none");
    setProductRefund("none");
  };
  const openPurchase = () => {
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("flex");
    setProductRefund("none");
  };
  const openRefund = () => {
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("flex");
  };
  return (
    <SidebarContainer left={isAdminProductSidebar}>
      <SidebarXbox>
        <SidebarXbtn onClick={() => setIsAdminProductSidebar("-400px")}>
          <CloseIcon className="xIcon" style={{ color: "white" }} />
        </SidebarXbtn>
      </SidebarXbox>
      <SidebarNaviBtns>
        <SidebarNaviBtn onClick={openProductList}>
          <span className="sidenavispan">전체 상품 목록</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openStatistics}>
          <span className="sidenavispan">상품 선호도 통계</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openPurchase}>
          <span className="sidenavispan">상품 구매/결제 내역</span>
        </SidebarNaviBtn>
        <SidebarNaviBtn onClick={openRefund}>
          <span className="sidenavispan">상품 환불 내역</span>
        </SidebarNaviBtn>
      </SidebarNaviBtns>
    </SidebarContainer>
  );
};
export default AdminProductSidebar;
