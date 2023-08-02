import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import FestivalAPI from "../api/FestivalAPI";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const BodyContainer = styled.div`
  height: 100%;
  display: flex;

  /* mapContainer 영역 */
  .category_container {
    position: absolute;
    display: block;
    z-index: 2;
    left: 10px;
  }

  /* 지역별 검색 */
  .location_checkbox_area {
    display: flex;
    flex-wrap: wrap;
    width: 550px;
    height: 150px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin: -10px 0 0 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px -1px #555555;
  }

  .location_checkbox {
    display: flex;
    width: 95px;
    height: 40px;
    border: 0.5px solid lightgray;
    border-radius: 4px;
    margin: 5px;
    align-items: center;
    box-shadow: 1px 1px 5px 0px #e2e2e2;
    cursor: pointer;
  }

  .location_checkbox:hover {
    background-color: #fff5fb;
  }

  .location_search_area input {
    width: 14px;
    height: 14px;
    margin: 7px;
    cursor: pointer;
  }

  .location_checkbox span {
    font-size: 15px;
    font-weight: 1000;
    cursor: pointer;
  }

  .location_checkbox label:hover {
    color: #0475f4;
  }

  /* 기간별 검색 */
  .period_search_area {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 200px;
    margin: -10px 0 0 145px;
    background-color: #fff;
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
    box-shadow: 1px 1px 5px 0px #e2e2e2;
  }

  .period_search_area input {
    margin: 10px;
    cursor: pointer;
  }

  .period_search_button {
    width: 50px;
    height: 30px;
    margin: 10px 15px;
    background-color: #fff;
    border: 0.5px solid lightgray;
    border-radius: 5px;
    align-self: flex-end;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px #e2e2e2;
  }

  /* 계절별 검색 */
  .season_checkbox_area {
    display: flex;
    width: 340px;
    height: 90px;
    justify-content: center;
    align-items: center;
    margin: -10px 0 0 285px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 2;
    box-shadow: 1px 1px 5px -1px #555555;
  }

  .season_checkbox {
    display: flex;
    width: 68px;
    height: 38px;
    border: 0.5px solid lightgray;
    border-radius: 4px;
    margin: 5px;
    align-items: center;
    box-shadow: 1px 1px 5px 0px #e2e2e2;
  }

  .season_checkbox:hover {
    background-color: #fff5fb;
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
    color: #0475f4;
  }
`;
// 검색 카테고리 스타일
const CategoryList = styled.ul`
  position: relative;
  display: inline-block;
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 7px 0;
`;
const CategoryItem = styled.li`
  display: list-item;
  list-style: none;
  float: left;
`;
const SearchItem = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 1px 1px 4px 0px #555555;
  :hover {
    color: #0475f4;
  }
`;
const ButtonBox = styled.div`
  width: 30px;
`;
const FestivalSearchCategory = ({ setPropsData }) => {
  // 지역별 검색 체크박스를 클릭할 때 체크된 지역만 나오게
  const [selectedLocations, setSelectedLocations] = useState("");
  // 날짜별 검색 기간을 정했을 경우
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setselectedEndDate] = useState();

  // 지역별 체크박스 담는 이벤트
  const locationCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedLocations((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedLocations((prevSelected) =>
        prevSelected.filter((location) => location !== id)
      );
    }
  };

  const setStartDateEvent = (e) => {
    setSelectedStartDate(e.target.value);
    console.log("축제 시작 기간" + e.target.value);
  };
  const setEndDateEvent = (e) => {
    setselectedEndDate(e.target.value);
    console.log("끝나는 기간" + e.target.value);
  };

  // 검색 카테고리 메뉴 클릭 이벤트
  const [isOpenLocation, setIsOpenLocation] = useState(false);

  // 다른 필터 닫기
  const filterButtonClick = (filterName, isOpenState, setIsOpenState) => {
    setIsOpenState(!isOpenState);
    if (filterName !== "location") {
      setIsOpenLocation(false);
    }
  };

  // 검색 버튼 클릭 시 필터에 들어온 정보를 토대로 축제 정보를 가져오는 이벤트
  const [isClick, setIsClick] = useState(false);
  const clickEvent = () => {
    setIsClick(true);
  };

  const getLocationInfo = async () => {
    const response = await FestivalAPI.searchFestival(
      selectedLocations,
      selectedStartDate,
      selectedEndDate
    );
    if (response.status === 200) {
      console.log(response);
      setPropsData("필터에서 받아온 값 : " + response);
    }
  };
  isClick && getLocationInfo();

  return (
    <BodyContainer>
      <div className="category_container">
        <CategoryList>
          <CategoryItem>
            <SearchItem
              onClick={() =>
                filterButtonClick("location", isOpenLocation, setIsOpenLocation)
              }
            >
              <FilterAltIcon />
            </SearchItem>
          </CategoryItem>
        </CategoryList>

        {/* 지역별 검색 */}
        {isOpenLocation && (
          <div>
            <div className="location_checkbox_area">
              <label htmlFor="서울">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="서울"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("서울")}
                  />
                  <span>서울</span>
                </div>
              </label>
              <label htmlFor="경기도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="경기도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("경기도")}
                  />
                  <span>경기</span>
                </div>
              </label>
              <label htmlFor="강원도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="강원도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("강원도")}
                  />
                  <span>강원</span>
                </div>
              </label>
              <label htmlFor="충청북도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="충청북도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("충청북도")}
                  />
                  <span>충북</span>
                </div>
              </label>
              <label htmlFor="충청남도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="충청남도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("충청남도")}
                  />
                  <span>충남</span>
                </div>
              </label>
              <label htmlFor="경상북도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="경상북도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("경상북도")}
                  />
                  <span>경북</span>
                </div>
              </label>
              <label htmlFor="경상남도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="경상남도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("경상남도")}
                  />
                  <span>경남</span>
                </div>
              </label>
              <label htmlFor="전라북도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="전라북도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("전라북도")}
                  />
                  <span>전북</span>
                </div>
              </label>
              <label htmlFor="전라남도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="전라남도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("전라남도")}
                  />
                  <span>전남</span>
                </div>
              </label>
              <label htmlFor="제주도">
                <div className="location_checkbox">
                  <input
                    type="checkbox"
                    id="제주도"
                    onChange={locationCheckboxChange}
                    checked={selectedLocations.includes("제주도")}
                  />
                  <span>제주</span>
                </div>
              </label>

              <div>
                <div>
                  <label>축제 시작일</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setStartDateEvent(e);
                    }}
                  ></input>
                </div>
                <div>
                  <label>축제 종료일</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setEndDateEvent(e);
                    }}
                  ></input>
                </div>
                <button
                  className="period_search_button"
                  onClick={() => clickEvent()}
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BodyContainer>
  );
};

export default FestivalSearchCategory;
