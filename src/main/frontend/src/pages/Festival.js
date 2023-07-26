import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "../components/FestivalSearchCategory";
import Sidebar from "../components/Sidebar";

const BodyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 58px);
  display: flex;
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const Festival = () => {
  return (
    <BaseContainer>
      <Header />
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
