import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = ({ children }) => {
  const [title, setTitle] = useState("test");
  const [value, setValue] = useState(2000);
  const [total, setTotal] = useState(2000);
  const [tax, setTax] = useState(0);
  const [isPaySuccess, setIsPaySuccess] = useState("false");
  const [userEmail, setUserEmail] = useState("qhwkal1@naver.com");
  const [isSidebar, setIsSidebar] = useState("-400px");
  const [isLogin, setIsLogin] = useState(false);
  const [productId, setProductId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  //관리자 페이지 상태관리용 useState
  const [isAdminBadgeSidebar, setIsAdminBadgeSidebar] = useState("-400px");
  const [isAdminProductSidebar, setIsAdminProductSidebar] = useState("-400px");
  const [isAdminMemberSidebar, setIsAdminMemberSidebar] = useState("-400px");
  const [isAdminFestivalSidebar, setIsAdminFestivalSidebar] =
    useState("-400px");
  const [isAdminActivitySidebar, setIsAdminActivitySidebar] =
    useState("-400px");
  const [memberOpacity, setMemberOpacity] = useState("none");
  const [boardOpacity, setBoardOpacity] = useState("none");
  const [commentOpacity, setCommentOpacity] = useState("none");
  const [reportOpacity, setReportOpacity] = useState("none");
  const [productOpacity, setProductOpacity] = useState("none");
  const [productStatisticsOpacity, setProductStatisticsOpacity] =
    useState("none");
  const [productPurchase, setProductPurchase] = useState("none");
  const [productRefund, setProductRefund] = useState("none");
  const [festivalOpacity, setFestivalOpacity] = useState("none");
  const [secondFestOpacity, setSecondFestOpacity] = useState("none");
  const [thirdFestOpacity, setThirdFestOpacity] = useState("none");
  const [forthFestOpacity, setForthFestOpacity] = useState("none");
  const [programOpacity, setProgramOpacity] = useState("none");
  const [requestProgram, setRequestProgram] = useState("none");
  const [purchaseProgram, setPurchaseProgram] = useState("none");
  const [refundProgram, setRefundProgram] = useState("none");
  const [programReview, setProgramReview] = useState("none");
  const [badgeOpacity, setBadgeOpacity] = useState("none");
  const [approveBadge, setApproveBadge] = useState("none");
  // marker
  const [contextLatitude, setContextLatitude] = useState([]);
  const [contextLongitude, setContextLongitude] = useState([]);
  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  // Info Window
  const [contextFstvlNm, setContextFstvlNm] = useState([]);
  const [contextFstvlLike, setContextFstvlLike] = useState([]);
  //페스티벌 창, 모바일 모드에서 searchbox의 움직임 제어
  const [searchBoxMove, setSearchBoxMove] = useState("0");
  //페스티벌 창, 데스크톱 모드에서 detailbox의 움직임 제어
  const [festDetailBoxMove, setFestDetailBoxMove] = useState("-80px");
  const [festDetailBoxMoveY, setFestDetailBoxMoveY] = useState("200vh");
  //페스티벌 창, 모바일 모드에서 검색창 내용을 searchbox로 전달
  const [contextFestivalSearch, setContextFestivalSearch] = useState("");
  //페스티벌 창에서 자세히 보기를 누르면 festival_id를 detailbox로 전달
  const [detailComponentValue, setDetailComponentValue] = useState(0);
  const ContextValue = {
    userEmail,
    setUserEmail,
    title,
    setTitle,
    value,
    setValue,
    total,
    setTotal,
    tax,
    setTax,
    isPaySuccess,
    setIsPaySuccess,
    isSidebar,
    setIsSidebar,
    isAdminBadgeSidebar,
    setIsAdminBadgeSidebar,
    isAdminProductSidebar,
    setIsAdminProductSidebar,
    isAdminMemberSidebar,
    setIsAdminMemberSidebar,
    isAdminFestivalSidebar,
    setIsAdminFestivalSidebar,
    isAdminActivitySidebar,
    setIsAdminActivitySidebar,
    isLogin,
    setIsLogin,
    memberOpacity,
    setMemberOpacity,
    productOpacity,
    setProductOpacity,
    productStatisticsOpacity,
    setProductStatisticsOpacity,
    productPurchase,
    setProductPurchase,
    productRefund,
    setProductRefund,
    commentOpacity,
    setCommentOpacity,
    reportOpacity,
    setReportOpacity,
    festivalOpacity,
    setFestivalOpacity,
    badgeOpacity,
    setBadgeOpacity,
    programOpacity,
    setProgramOpacity,
    requestProgram,
    setRequestProgram,
    purchaseProgram,
    setPurchaseProgram,
    refundProgram,
    setRefundProgram,
    programReview,
    setProgramReview,
    boardOpacity,
    setBoardOpacity,
    secondFestOpacity,
    setSecondFestOpacity,
    thirdFestOpacity,
    setThirdFestOpacity,
    forthFestOpacity,
    setForthFestOpacity,
    approveBadge,
    setApproveBadge,
    contextLatitude,
    setContextLatitude,
    contextLongitude,
    setContextLongitude,
    centerLatitude,
    setCenterLatitude,
    centerLongitude,
    setCenterLongitude,
    searchBoxMove,
    setSearchBoxMove,
    contextFestivalSearch,
    setContextFestivalSearch,
    festDetailBoxMove,
    setFestDetailBoxMove,
    festDetailBoxMoveY,
    setFestDetailBoxMoveY,
    contextFstvlNm,
    setContextFstvlNm,
    contextFstvlLike,
    setContextFstvlLike,
    detailComponentValue,
    setDetailComponentValue,
    productId,
    setProductId,
    memberId,
    setMemberId,
    price,
    setPrice,
    quantity,
    setQuantity
  };

  return (
    <UserContext.Provider value={ContextValue}>{children}</UserContext.Provider>
  );
};

export default UserStore;
