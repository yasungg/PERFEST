import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "../components/FestivalSearchCategory";

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const Festival = () => {
	const [isData, setIsData] = useState(false);
	const [festivalData, setFestivalData] = useState("");
	useEffect(() => {
		// 페이지 렌더링 될 때 백엔드에서 공공api를 DB에 저장하도록 하는 로직
		const saveFestivalInfoToDB = async() => {
			// response 가 true 면 DB에 저장 성공한 것!
			const response = await FestivalAPI.saveFestivalInfo();
			if(response.status === 200) {
				setIsData(true);
				console.log("DB에 저장완료");

			}
		}
		const getFestivalData = async() => {
			console.log("getFestival 실행");
			const response = await FestivalAPI.getFestivalInfo();
			if(response.status === 200) {
				console.log(response);
				setFestivalData(response.data);
				console.log("페스티벌 데이터");
				console.log(festivalData);
			}
		}
		saveFestivalInfoToDB();
		getFestivalData();
	},[])

	return(
		<Container
			justifyContent="center">	
    	<Header/>
        <BodyContainer>
					{/* 검색창 / 결과창 */}
          <SearchSideBar/>

					{/* 지도 */}
					<MapContainer>
						<NaverMap data={festivalData}/>
						<FestivalSearchCategory/>
					</MapContainer>
        </BodyContainer>
    </Container>
  );
};
export default Festival;