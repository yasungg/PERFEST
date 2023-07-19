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

const ProgramReview = () => {
  const { programReview, setProgramReview } = useContext(UserContext);

  return (
    <AdminCard display={programReview}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="프로그램 리뷰 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setProgramReview("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default ProgramReview;
