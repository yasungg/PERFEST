import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import HeaderForFestival from "../components/HeaderForFestival";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "../components/FestivalSearchCategory";
import Sidebar from "../components/Sidebar";

const BodyContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 58px);
  display: flex;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    width: 100vw;
    height: 100vh;
  }
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    width: 100vw;
    height: 100vh;
  }
`;

const Festival = () => {
  return (
    <BaseContainer>
      <HeaderForFestival />
      <BodyContainer>
        <SearchSideBar />
        <MapContainer>
          <NaverMap />
          <FestivalSearchCategory />
        </MapContainer>
      </BodyContainer>
      <Sidebar />
    </BaseContainer>
  );
};
export default Festival;
