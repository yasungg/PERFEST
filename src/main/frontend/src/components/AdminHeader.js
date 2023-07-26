import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import { UserContext } from "../context/UserStore";
import LoginAPI from "../api/LoginAPI";
import { useNavigate } from "react-router";
import MemberAPI from "../api/MemberAPI";
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  .logo {
    height: 48px;
    background: transparent;
    &:hover {
      cursor: pointer;
    }
  }
  .header-body {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 1025px) {
      display: none;
    }
  }
  .navi-btns {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    .navi-btn-span {
      font-size: 1.1em;
      font-weight: 600;
    }
  }
  .navi-btn {
    width: 80px;
    height: 100%;
    border: none;
    outline: none;
    background: white;
    transition: all 0.2s ease-in;
    &:hover {
      cursor: pointer;
      transform: translateX(-5px);
    }
  }
  .admin-user-box {
    display: flex;
    justify-content: flex-end;
    width: 420px;
    height: 100%;
    align-items: center;
    .admin-info {
      font-size: 0.8em;
      margin-right: 16px;
    }
  }
  .logout-btn {
    width: 100px;
    height: 60%;
    border-radius: 3px;
    background-color: #222;
    color: white;
    margin-right: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AdminHeader = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(UserContext);
  const {
    setIsAdminBadgeSidebar,
    setIsAdminMemberSidebar,
    setIsAdminFestivalSidebar,
    setIsAdminProductSidebar,
    setIsAdminActivitySidebar,
    setMemberOpacity,
    setBoardOpacity,
    setReportOpacity,
    setCommentOpacity,
    setFestivalOpacity,
    setSecondFestOpacity,
    setThirdFestOpacity,
    setForthFestOpacity,
    setProductOpacity,
    setProductStatisticsOpacity,
    setProductPurchase,
    setProductRefund,
    setProgramOpacity,
    setRequestProgram,
    setPurchaseProgram,
    setRefundProgram,
    setProgramReview,
    setBadgeOpacity,
    setApproveBadge,
  } = useContext(UserContext);

  const [headerName, setHeaderName] = useState("");

  const member = () => {
    setIsAdminBadgeSidebar("-400px");
    setIsAdminMemberSidebar("-2px");
    setIsAdminFestivalSidebar("-400px");
    setIsAdminProductSidebar("-400px");
    setIsAdminActivitySidebar("-400px");
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("none");
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
    setBadgeOpacity("none");
    setApproveBadge("none");
  };
  const product = () => {
    setIsAdminBadgeSidebar("-400px");
    setIsAdminMemberSidebar("-400px");
    setIsAdminFestivalSidebar("-400px");
    setIsAdminProductSidebar("-2px");
    setIsAdminActivitySidebar("-400px");
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("none");
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
    setBadgeOpacity("none");
    setApproveBadge("none");
  };
  const festival = () => {
    setIsAdminBadgeSidebar("-400px");
    setIsAdminMemberSidebar("-400px");
    setIsAdminFestivalSidebar("-2px");
    setIsAdminProductSidebar("-400px");
    setIsAdminActivitySidebar("-400px");
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("none");
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("none");
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
    setBadgeOpacity("none");
    setApproveBadge("none");
  };
  const program = () => {
    setIsAdminBadgeSidebar("-400px");
    setIsAdminMemberSidebar("-400px");
    setIsAdminFestivalSidebar("-400px");
    setIsAdminProductSidebar("-400px");
    setIsAdminActivitySidebar("-2px");
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("none");
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("none");
    setBadgeOpacity("none");
    setApproveBadge("none");
  };
  const badge = () => {
    setIsAdminBadgeSidebar("-2px");
    setIsAdminMemberSidebar("-400px");
    setIsAdminFestivalSidebar("-400px");
    setIsAdminProductSidebar("-400px");
    setIsAdminActivitySidebar("-400px");
    setMemberOpacity("none");
    setBoardOpacity("none");
    setReportOpacity("none");
    setCommentOpacity("none");
    setFestivalOpacity("none");
    setSecondFestOpacity("none");
    setThirdFestOpacity("none");
    setForthFestOpacity("none");
    setProductOpacity("none");
    setProductStatisticsOpacity("none");
    setProductPurchase("none");
    setProductRefund("none");
    setProgramOpacity("none");
    setRequestProgram("none");
    setPurchaseProgram("none");
    setRefundProgram("none");
    setProgramReview("none");
  };
  const logout = () => {
    const Logout = LoginAPI.Logout()
      .then((result) => {
        if (result.status === 200) {
          console.log("네트워크 상태" + result.status);
          console.log("로그아웃 성공!");
          setIsLogin(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  useEffect(() => {
    const getName = async () => {
      const name = await MemberAPI.Name()
        .then((result) => {
          console.log(result);
          setHeaderName(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getName();
  }, []);
  return (
    <Header className="header-container">
      <img
        src={BlackLogo}
        alt="로고"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="header-body">
        <div className="navi-btns">
          <button className="navi-btn">
            <span className="navi-btn-span" onClick={member}>
              회원
            </span>
          </button>
          <button className="navi-btn">
            <span className="navi-btn-span" onClick={festival}>
              축제
            </span>
          </button>
          <button className="navi-btn">
            <span className="navi-btn-span" onClick={product}>
              상품
            </span>
          </button>
          <button className="navi-btn">
            <span className="navi-btn-span" onClick={program}>
              활동
            </span>
          </button>
          <button className="navi-btn">
            <span className="navi-btn-span" onClick={badge}>
              뱃지
            </span>
          </button>
        </div>
      </div>
      <div className="admin-user-box">
        <span className="admin-info">관리책임자 : </span>
        <span className="admin-info">{headerName}</span>
        <button className="logout-btn" onClick={logout}>
          <span>로그아웃</span>
        </button>
      </div>
    </Header>
  );
};
export default AdminHeader;
