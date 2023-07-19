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

const AdminChangeFestivalInfo = () => {
  const { secondFestOpacity, setSecondFestOpacity } = useContext(UserContext);

  return (
    <AdminCard display={secondFestOpacity}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="신청 내역 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setSecondFestOpacity("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default AdminChangeFestivalInfo;
