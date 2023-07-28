import { Container } from "./StandardStyles";
import styled from "@emotion/styled";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import { formatDateForFestival } from "./DateStyle";
import { useNavigate } from "react-router";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DirectionsIcon from "@mui/icons-material/Directions";
import AttractionsIcon from "@mui/icons-material/Attractions";
import BusinessIcon from "@mui/icons-material/Business";

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
  width: 60px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  .bold {
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
const InfoBox = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;
const InfoIconBox = styled.div`
  display: inline-block;
  width: 40px;
  height: 100%;
  float: left;
`;
const InfoDescBox = styled.div`
  display: inline-block;
  width: calc(100% - 72px);
  height: auto;
  .direction-button {
    color: #222;
    font-size: 18px;
    transform: translateY(3px);
    margin-left: 4px;
    transition: all 0.1s ease-in;
    &:hover {
      color: royalblue;
    }
  }
`;
const DetailHome = () => {
  const { setCenterLatitude, setCenterLongitude } = useContext(UserContext);

  //카드를 클릭하면 해당 마커의 위치로 지도 위치를 이동시키기 위한 context 설정
  const setCenterMarker = (latitude, longitude) => {
    setCenterLatitude(latitude);
    setCenterLongitude(longitude);
    // setSearchBoxMove("-100vh");
    console.log(latitude);
    console.log(longitude);
  };
  return (
    <Container>
      <AdvertisementBox>
        <div className="spanbox">
          <span className="bold">캘린더</span>
          <span>를 활용해 편리하게 축제일정을 관리하세요!</span>
        </div>
        <MiniButton className="advertisement-button">
          <div className="icon-change">
            <CalendarMonthIcon
              className="calendar-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
            <AddIcon
              className="add-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
          </div>
          <span className="bold">캘린더</span>
        </MiniButton>
      </AdvertisementBox>
      <InfoBox>
        <InfoIconBox>
          <PlaceIcon style={{ color: "royalblue" }} />
        </InfoIconBox>
        <InfoDescBox>
          <span>서울 강남구 테헤란로 14길 6</span>
          <DirectionsIcon className="direction-button" />
        </InfoDescBox>
      </InfoBox>
      <InfoBox>
        <InfoIconBox>
          <LocalPhoneIcon style={{ color: "royalblue" }} />
        </InfoIconBox>
        <InfoDescBox>042-485-6212</InfoDescBox>
      </InfoBox>
      <InfoBox>
        <InfoIconBox>
          <AttractionsIcon style={{ color: "royalblue" }} />
        </InfoIconBox>
        <InfoDescBox>
          <p style={{ fontSize: "14px" }}>시작일 : 2023.4.7</p>
          <p style={{ fontSize: "14px" }}>종료일 : 2023.6.25</p>
        </InfoDescBox>
      </InfoBox>
      <InfoBox>
        <InfoIconBox>
          <BusinessIcon style={{ color: "royalblue" }} />
        </InfoIconBox>
        <InfoDescBox>
          <span>서울시청</span>
        </InfoDescBox>
      </InfoBox>
      <InfoBox>
        <InfoIconBox>
          <PlaceIcon style={{ color: "royalblue" }} />
        </InfoIconBox>
        <InfoDescBox>서울 강남구 테헤란로 14길 6</InfoDescBox>
      </InfoBox>
    </Container>
  );
};
export default DetailHome;
