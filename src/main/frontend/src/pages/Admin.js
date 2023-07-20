import styled from "@emotion/styled";
import AdminHeader from "../components/AdminHeader";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import AdminBadgeSidebar from "../components/AdminBadgeSidebar";
import AdminActivitySidebar from "../components/AdminActivitySidebar";
import AdminFestivalSidebar from "../components/AdminFestivalSidebar";
import AdminMemberSidebar from "../components/AdminMemberSidebar";
import AdminProductSidebar from "../components/AdminProductSidebar";
import MembershipManagement from "../components/MembershipManagement";
import BoardManagement from "../components/BoardManagement";
import CommentManagement from "../components/CommentManagement";
import ReportManagement from "../components/ReportManagement";
import AdminFestivalList from "../components/AdminFestivalList";
import AdminChangeFestivalInfo from "../components/AdminChangeFestivalInfo";
import AdminFestTelInfo from "../components/AdminFestTelInfo";
import AdminFestReviewManagement from "../components/AdminFestReviewManagement";
import AdminProductList from "../components/AdminProductList";
import ProductStatistics from "../components/ProductStats";
import PurchaseList from "../components/ProductPurchase";
import ProductRefundList from "../components/ProductRefundList";
import ProgramList from "../components/ProgramList";
import RequestProgram from "../components/RequestProgram";
import PurchaseProgram from "../components/PurchaseProgram";
import RefundProgram from "../components/RefundProgram";
import ProgramReview from "../components/ProgramReview";
import BadgeManagement from "../components/BadgeManagement";
import ApproveBadge from "../components/ApproveBadge";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  overflow: hidden;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;
const Admin = () => {
  const { setAdminSelectedMenu } = useContext(UserContext);
  return (
    <Container>
      <AdminHeader />
      <AdminBadgeSidebar />
      <AdminFestivalSidebar />
      <AdminActivitySidebar />
      <AdminMemberSidebar />
      <AdminProductSidebar />
      <MembershipManagement />
      <BoardManagement />
      <CommentManagement />
      <ReportManagement />
      <AdminFestivalList />
      <AdminChangeFestivalInfo />
      <AdminFestTelInfo />
      <AdminFestReviewManagement />
      <AdminProductList />
      <ProductStatistics />
      <PurchaseList />
      <ProductRefundList />
      <ProgramList />
      <RequestProgram />
      <PurchaseProgram />
      <RefundProgram />
      <ProgramReview />
      <BadgeManagement />
      <ApproveBadge />
    </Container>
  );
};
export default Admin;
