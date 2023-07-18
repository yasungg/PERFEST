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
  const [adminSelectedMenu, setAdminSelectedMenu] = useState("");
  const [isAdminBadgeSidebar, setIsAdminBadgeSidebar] = useState("-400px");
  const [isAdminProductSidebar, setIsAdminProductSidebar] = useState("-400px");
  const [isAdminMemberSidebar, setIsAdminMemberSidebar] = useState("-400px");
  const [isAdminFestivalSidebar, setIsAdminFestivalSidebar] =
    useState("-400px");
  const [isAdminActivitySidebar, setIsAdminActivitySidebar] =
    useState("-400px");
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
    adminSelectedMenu,
    setAdminSelectedMenu,
  };

  return (
    <UserContext.Provider value={ContextValue}>{children}</UserContext.Provider>
  );
};

export default UserStore;
