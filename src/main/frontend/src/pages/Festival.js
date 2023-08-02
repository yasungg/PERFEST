import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "./FestivalSearchCategory";
import FestivalDetail from "./FestivalDetail";
import Sidebar from "../components/Sidebar";
import HeaderForFestival from "../components/HeaderForFestival";
import { Container as BaseContainer } from "../components/StandardStyles";

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
  const [propsData, setPropsData] = useState("");
  const [festivalData, setFestivalData] = useState("");

  return (
    <BaseContainer>
      <HeaderForFestival />
      <BodyContainer>
        <SearchSideBar festivalData={festivalData} />
        <FestivalDetail />
        <Sidebar />
        <MapContainer>
          <NaverMap festivalData={festivalData} />
          <FestivalSearchCategory setPropsData={setPropsData} />
        </MapContainer>
      </BodyContainer>
    </BaseContainer>
  );
};
export default Festival;
