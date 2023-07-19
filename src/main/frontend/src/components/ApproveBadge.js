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

const ApproveBadge = () => {
  const { approveBadge, setApproveBadge } = useContext(UserContext);

  return (
    <AdminCard display={approveBadge}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="승인 대기 뱃지 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setApproveBadge("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default ApproveBadge;
