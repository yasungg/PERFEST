import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;

	.mapContainer {
		display: flex;
		width: 100%;
		height: 100vh;
		position: relative;
		background-color: black;
	}
	
	/* mapContainer 영역 */
	.category_container {
		position: absolute;
		display: block;
		margin: 0 10px;
		width: 510px;
		height: 74.95px;
		z-index: 2;
	}

	/* 버블필터 ul */
	.bubble_filter_list {
		position: relative;
		display: inline-block;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 5px;
		margin: 7px 0;
	}

	/* 버블필터 li */
	.bubble_filter_item {
		display: list-item;
		list-style: none;
		float: left;
	}

	.bubble_filter_button_location, .bubble_filter_button_period, .bubble_filter_button_theme {
		width: 120px;
		height: 50px;
		font-size: 15px;
		font-weight: 600;
		color: #242424;
		border: none;
		border-radius: 5px;
		background-color: #fff;
		margin-right: 20px;
		cursor: pointer;
		box-shadow: 1px 1px 4px 0px #555555;
	}

  /* 지역별 검색 */
	.location_search_area {
		width: 550px;
		height: 220px;
		background-color: #FFF;
		margin: -10px 0 0 5px;
		border-radius: 5px;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.location_checkbox_area {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 180px;
		justify-content: center;
		align-items: center;
	}

	.location_checkbox {
		display: flex;
		width: 95px;
		height: 40px;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin: 5px;
		align-items: center;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.location_checkbox:hover {
		background-color: #FFF5FB;
	}
	
	.location_search_area input {
		width: 14px;
		height: 14px;
		margin: 7px; 
		cursor: pointer;
	}
	
	.location_checkbox label {
		font-size: 15px;
		font-weight: 1000	;
		cursor: pointer;
	}
	
	.location_checkbox label:hover {
		color: #0475F4;
	}

	.location_search_button {
		width: 50px;
		height: 30px;
		background-color: #FFF;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		float: right;
		margin: 0 10px;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

  /* 기간별 검색 */
	.period_search_area {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 110px;
		margin: -10px 0 0 145px;
		background-color: #FFF;
		border-radius: 5px;
		z-index: 2;
		justify-content: center;
		align-items: center;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.period_search_area div {
		display: flex;
		width: 90%;
		height: 40px;
		justify-content: center;
		align-items: center;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin-top: 15px;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.period_search_area input {
		margin: 10px;
		cursor: pointer;
	}

  .period_search_button {
    width: 50px;
		height: 30px;
		margin: 10px 15px;
		background-color: #FFF;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		align-self: flex-end;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
  }

  /* 계절별 검색 */
  .season_search_area {
    display: flex;
		flex-direction: column;
    width: 340px;
		height: 110px;
    margin: -10px 0 0 285px;
    background-color: #FFF;
    border-radius: 5px;
    z-index: 2;
		box-shadow: 1px 1px 5px -1px #555555;
  }

	.season_checkbox_area {
		display: flex;
		width: 100%;
		height: 40px;
		margin-top: 15px;
		justify-content: center;
		align-items: center;
	}

	.season_checkbox {
		display: flex;
		width: 68px;
		height: 38px;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin: 5px;
		align-items: center;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.season_checkbox:hover {
		background-color: #FFF5FB;
	}

	.season_checkbox input {
		width: 14px;
		height: 14px;
		margin: 7px;
		cursor: pointer;
	}

	.season_checkbox label {
		font-size: 15px;
		font-weight: 1000;
		cursor: pointer;
	}

	.season_checkbox label:hover {
		color: #0475F4;
	}

	.season_search_button {
		width: 50px;
		height: 30px;
		background-color: #FFF;
		margin: 10px 15px;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		align-self: flex-end;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

  /* 지도 조종 영역 */
	.map_control_area {
		position: absolute;
		z-index: 2;
		bottom: 30px;
		right: 12px;
	}

	.zoom_control_area {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.zoom_in, .zoom_out {
		margin: 0.15px 0;
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 3px;
		cursor: pointer;
		font-size: 18px;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.my_location {
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 3px;
		cursor: pointer;
		box-shadow: 1px 1px 5px -1px #555555;
	}
`;
// 전체 페이지 스크롤바 숨김 기능
const Container = styled(BaseContainer)`
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`


const Festival = () => {

	// bubble filrer 버튼 hover 기능
	const [isLocationHovered, setLocationIsHovered] = useState(false);
	const [isPeriodHovered, setIsPeriodHovered] = useState(false);
	const [isThemeHovered, setIsThemeHovered] = useState(false);

	const handleLocationButtonHover = () => {
		setLocationIsHovered(true);
	};
	const handleLocationButtonLeave = () => {
		setLocationIsHovered(false);
	}

	const handlePeriodButtonHover = () => {
		setIsPeriodHovered(true);
	}
	const handlePeriodButtonLeave = () => {
		setIsPeriodHovered(false);
	}

	const handleThemeButtonHover = () => {
		setIsThemeHovered(true);
	}
	const handleThemeButtonLeave = () => {
		setIsThemeHovered(false);
	}

	// bubble filter 버튼 펼치기 / 닫기 기능
	const [isOpenLocation, setIsOpenLocation] = useState(false);
	const [isOpenPeriod, setIsOpenPeriod] = useState(false);
	const [isOpenSeason, setIsOpenSeason] = useState(false);
	const formRef = useRef(null);

  // 다른 필터 닫기
  const handleFilterButtonClick = (filterName, isOpenState, setIsOpenState) => {
    setIsOpenState(!isOpenState);

    if(filterName !== 'location') {
      setIsOpenLocation(false);
    }

    if(filterName !== 'period') {
      setIsOpenPeriod(false);
    }

    if(filterName !== 'season') {
      setIsOpenSeason(false);
    }
  }

  // 지역별 검색
	useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenLocation(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenLocation(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};
	}, []);

  // 기간별 검색
  useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenPeriod(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenPeriod(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};

	}, []);

  // 계절별 검색
  useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenSeason(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenSeason(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};

	}, []);

	return(
		<Container
			justifyContent="center">	
    	<Header />
        <BodyContainer>
					{/* 검색창 / 결과창 */}
          <SearchSideBar
						onClick={() => {setIsOpenLocation(false)}}
					/>

					{/* 지도 */}
					<div className="mapContainer">
						<NaverMap />
						<div className="category_container">
							<ul className="bubble_filter_list">
								<li className="bubble_filter_item">
									<button
										className="bubble_filter_button_location"
										onClick={() => handleFilterButtonClick('location', isOpenLocation, setIsOpenLocation)}
										onMouseEnter={handleLocationButtonHover}
										onMouseLeave={handleLocationButtonLeave}
										style={{color: isOpenLocation || isLocationHovered ? '#0475F4' : 'black'}}
										>@ 지역별 검색</button>
								</li>

								<li className="bubble_filter_item">
									<button
                    className="bubble_filter_button_period"
                    onClick={() => handleFilterButtonClick('period', isOpenPeriod, setIsOpenPeriod)}
									  onMouseEnter={handlePeriodButtonHover}
									  onMouseLeave={handlePeriodButtonLeave}
									  style={{color: isOpenPeriod || isPeriodHovered ? '#0475F4' : 'black'}}
									>@ 기간별 검색</button>
								</li>

								<li className="bubble_filter_item">
									<button
										className="bubble_filter_button_theme"
                    onClick={() => handleFilterButtonClick('season', isOpenSeason, setIsOpenSeason)}
										onMouseEnter={handleThemeButtonHover}
										onMouseLeave={handleThemeButtonLeave}
										style={{color: isOpenSeason || isThemeHovered ? '#0475F4' : 'black'}}
										>@ 계절별 검색</button>
								</li>
							</ul>

							{/* 지역별 검색 */}
							{isOpenLocation && (
							<form className="location_search_area">
								<div className="location_checkbox_area">
									<div className="location_checkbox">
										<input type="checkbox" id="서울" />
										<label htmlFor="서울">서울</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경기도" />
										<label htmlFor="경기도">경기도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="강원도" />
										<label htmlFor="강원도">강원도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="충청북도" />
										<label htmlFor="충청북도">충청북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="충청남도" />
										<label htmlFor="충청남도">충청남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경상북도" />
										<label htmlFor="경상북도">경상북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경상남도" />
										<label htmlFor="경상남도">경상남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="전라북도" />
										<label htmlFor="전라북도">전라북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="전라남도" />
										<label htmlFor="전라남도">전라남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="제주도" />
										<label htmlFor="제주도">제주도</label>
									</div>
								</div>
								<button className="location_search_button">검색</button>
							</form>
							)}

              {/* 기간별 검색 */}
              {isOpenPeriod && (
							<form className="period_search_area">
								<div>
									<input type="date"></input>
									<p>~</p>
									<input type="date"></input>
								</div>
								<button className="period_search_button">검색</button>
							</form>
              )}
              
              {/* 계절별 검색 */}
              {isOpenSeason && (
              <form className="season_search_area">
                <div className="season_checkbox_area">
									<div className="season_checkbox">
										<input type="checkbox" id="spring"/>
										<label htmlFor="spring">봄</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="summer"/>
										<label htmlFor="summer">여름</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="autumn"/>
										<label htmlFor="autumn">가을</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="winter"/>
										<label htmlFor="winter">겨울</label>
									</div>
                </div>
                <button className="season_search_button">검색</button>
              </form>
              )}
						</div>
						{/* 줌 기능 */}
						<div className="map_control_area">
							<div className="zoom_control_area">
								<button className="zoom_in">+</button>
								<button className="zoom_out">-</button>
							</div>
							<button className="my_location">나</button>
						</div>
					</div>
        </BodyContainer>
    </Container>
  );
};
export default Festival;