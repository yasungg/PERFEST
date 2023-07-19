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

const AdminFestTelInfo = () => {
  const { thirdFestOpacity, setThirdFestOpacity } = useContext(UserContext);

  return (
    <AdminCard display={thirdFestOpacity}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox
            type="text"
            placeholder="관계자가 속한 축제를 검색하세요."
          />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setThirdFestOpacity("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default AdminFestTelInfo;
