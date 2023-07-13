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
    isLogin,
    setIsLogin,
  };

  return (
    <UserContext.Provider value={ContextValue}>{children}</UserContext.Provider>
  );
};

export default UserStore;
