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

const PurchaseProgram = () => {
  const { purchaseProgram, setPurchaseProgram } = useContext(UserContext);

  return (
    <AdminCard display={purchaseProgram}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="프로그램 결제 내역" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setPurchaseProgram("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default PurchaseProgram;
