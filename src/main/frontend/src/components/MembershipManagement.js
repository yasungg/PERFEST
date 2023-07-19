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

const MembershipManagement = () => {
  const { memberOpacity, setMemberOpacity } = useContext(UserContext);

  return (
    <AdminCard display={memberOpacity}>
      <Xbox>
        <SearchBoxContainer background="#222">
          <SearchBox type="text" placeholder="유저 검색" />
          <SearchBtn>
            <SearchIcon style={{ color: "#222" }} />
          </SearchBtn>
        </SearchBoxContainer>
        <Xbtn onClick={() => setMemberOpacity("none")}>
          <CloseIcon />
        </Xbtn>
      </Xbox>
    </AdminCard>
  );
};
export default MembershipManagement;
