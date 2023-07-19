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

const AdminFestReviewManagement = () => {
  const { forthFestOpacity, setForthFestOpacityOpacity } =
    useContext(UserContext);

  return (
    <AdminCard display={forthFestOpacity}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="축제 리뷰 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setForthFestOpacityOpacity("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default AdminFestReviewManagement;
