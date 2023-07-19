import {
  AdminCard,
  Xbox,
  Xbtn,
  SearchBoxContainer,
  SearchBox,
  SearchBtn,
} from "./StandardStyles";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import SearchIcon from "@mui/icons-material/Search";

const ProductRefundList = () => {
  const { productRefund, setProductRefund } = useContext(UserContext);

  return (
    <AdminCard display={productRefund}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="상품 환불 내역 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setProductRefund("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default ProductRefundList;
