import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "./FestivalSearchCategory";

const BodyContainer = styled.div`
  width: 100%;
   height: 100%;
  display: flex;
`;

const MapContainer = styled.div`
   display: flex;
   width: 100%;
   position: relative;
`

const Festival = () => {
   const [propsData, setPropsData] = useState("");
   const [festivalData, setFestivalData] = useState("");

   return(
      <div>
       <Header/>
        <BodyContainer>
          <SearchSideBar/>
               <MapContainer>
                  <NaverMap festivalData={festivalData}/>
                  <FestivalSearchCategory setPropsData={setPropsData} />
               </MapContainer>
        </BodyContainer>
      </div>
  );
};
export default Festival;