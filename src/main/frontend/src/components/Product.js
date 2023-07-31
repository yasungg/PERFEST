import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import { Container } from "./StandardStyles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";

const AdvertisementBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  background: #f1f1f1;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  span {
    font-size: 14px;
  }
  .bold {
    font-weight: 600;
  }
`;
const MiniButton = styled.button`
  display: flex;
  width: 74px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  .bold {
    width: auto;
    font-weight: 600;
    color: royalblue;
  }
  .icon-change {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    .add-icon {
      position: absolute;
      left: -20px;
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .icon-change {
    .calendar-icon {
      transition: all 0.1s linear;
      transform: translateX(20px);
    }
    .add-icon {
      transition: all 0.1s linear;
      left: 0;
    }
  }
`;
const Product = () => {
  return (
    <Container>
      <AdvertisementBox>
        <div className="spanbox">
          <span>무더운 여름을 시원하게 만들어 줄 </span>
          <span className="bold">시즌 상품</span>
        </div>
        <MiniButton className="advertisement-button">
          <div className="icon-change">
            <KeyboardDoubleArrowRightIcon
              className="calendar-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
            <KeyboardDoubleArrowRightIcon
              className="add-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
          </div>
          <span className="bold">바로가기</span>
        </MiniButton>
      </AdvertisementBox>
    </Container>
  );
};
export default Product;
