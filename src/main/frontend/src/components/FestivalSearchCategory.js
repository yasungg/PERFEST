import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CategoryContainer = styled.div`
  position: absolute;
  display: block;
  width: auto;
  height: auto;
  z-index: 1;
  @media screen and (max-width: 767px) {
    top: 54px;
  }
  @media screen and (max-width: 375px) {
    top: 40px;
  }
`;

const CategoryFilterList = styled.ul`
  position: relative;
  display: flex;
  width: 270px;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
`;

const CategoryFilterItem = styled.li`
  display: list-item;
  width: 80px;
  list-style: none;
  float: left;
`;

const CategoryFilterButton = styled.button`
  display: flex;
  width: 80px;
  height: 32px;
  font-size: 15px;
  font-weight: 600;
  color: #222;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  margin-right: 20px;
  cursor: pointer;
  box-shadow: 1px 1px 4px 0px #555555;
  align-items: center;
  justify-content: center;
`;

/* 지역별 검색 */
const LocationSearchArea = styled.div`
  position: absolute;
  width: 400px;
  top: 54px;
  height: 140px;
  background-color: white;
  margin: -10px 0 0 12px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px -1px #555555;
  @media screen and (max-width: 767px) {
    width: 94vw;
  }
`;

const LocationCheckboxArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 40px;
  justify-content: space-evenly;
  align-items: space-evenly;
`;

const LocationCheckbox = styled.div`
  display: flex;
  width: 60px;
  height: 40px;
  border: 0.5px solid lightgray;
  border-radius: 4px;
  margin: 5px;
  align-items: center;
  box-shadow: 1px 1px 5px 0px #e2e2e2;

  &:hover {
    color: #fff;
    background-color: #222222;
  }

  input {
    width: 14px;
    height: 14px;
    margin: 7px;
    cursor: pointer;
  }

  label {
    font-size: 15px;
    font-weight: 1000;
    cursor: pointer;
  }

  label:hover {
    color: #fff;
  }
  @media screen and (max-width: 375px) {
    width: 50px;
    height: 36px;

    label {
      font-size: 11px;
      cursor: pointer;
    }
  }
`;

const LocationSearchButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  background-color: #fff;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  bottom: 8px;
  right: 12px;
  cursor: pointer;
  box-shadow: 1px 1px 5px 0px #e2e2e2;
`;

/* 기간별 검색 */
const PeriodSearchArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 110px;
  margin: -10px 0 0 145px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px -1px #555555;
`;

const PeriodInputArea = styled.div`
  display: flex;
  width: 90%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: 0.5px solid lightgray;
  border-radius: 4px;
  margin-top: 15px;
  box-shadow: 1px 1px 5px 0px #e2e2e2;

  input {
    margin: 10px;
    cursor: pointer;
  }
`;

const PeriodSearchButton = styled.button`
  width: 50px;
  height: 30px;
  margin: 10px 15px;
  background-color: #fff;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  align-self: flex-end;
  cursor: pointer;
  box-shadow: 1px 1px 5px 0px #e2e2e2;
`;

/* 계절별 검색 */
const SeasonSearchArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 110px;
  margin: -10px 0 0 285px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;
  box-shadow: 1px 1px 5px -1px #555555;
`;

const SeasonCheckboxArea = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

const SeasonCheckBox = styled.div`
  display: flex;
  width: 68px;
  height: 38px;
  border: 0.5px solid lightgray;
  border-radius: 4px;
  margin: 5px;
  align-items: center;
  box-shadow: 1px 1px 5px 0px #e2e2e2;

  &:hover {
    color: #fff;
    background-color: #222222;
  }

  input {
    width: 14px;
    height: 14px;
    margin: 7px;
    cursor: pointer;
  }

  label {
    font-size: 15px;
    font-weight: 1000;
    cursor: pointer;
  }

  label:hover {
    color: #fff;
  }
`;

const SeasonSearchButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #fff;
  margin: 10px 15px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  align-self: flex-end;
  cursor: pointer;
  box-shadow: 1px 1px 5px 0px #e2e2e2;
`;

const FestivalSearchCategory = () => {
  // 카테고리 버튼 hover 기능
  const [isLocationHovered, setLocationIsHovered] = useState(false);
  const [isPeriodHovered, setIsPeriodHovered] = useState(false);
  const [isThemeHovered, setIsThemeHovered] = useState(false);

  const handleLocationButtonHover = () => {
    setLocationIsHovered(true);
  };
  const handleLocationButtonLeave = () => {
    setLocationIsHovered(false);
  };

  const handlePeriodButtonHover = () => {
    setIsPeriodHovered(true);
  };
  const handlePeriodButtonLeave = () => {
    setIsPeriodHovered(false);
  };

  const handleThemeButtonHover = () => {
    setIsThemeHovered(true);
  };
  const handleThemeButtonLeave = () => {
    setIsThemeHovered(false);
  };

  // 카테고리 버튼 펼치기 / 닫기 기능
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState(false);
  const [isOpenSeason, setIsOpenSeason] = useState(false);

  const [locationIconRotation, setLocationIconRotation] = useState(0);
  const [periodIconRotation, setPeriodIconRotation] = useState(0);
  const [seasonIconRotation, setSeasonIconRotation] = useState(0);

  const formRef = useRef(null);

  // 다른 필터 닫기
  const handleFilterButtonClick = (
    filterName,
    isOpenState,
    setIsOpenState,
    setIconRotation
  ) => {
    setIsOpenState(!isOpenState);
    setIconRotation(isOpenState ? 0 : 180);

    if (filterName !== "location") {
      setIsOpenLocation(false);
      setLocationIconRotation(0);
    }

    if (filterName !== "period") {
      setIsOpenPeriod(false);
      setPeriodIconRotation(0);
    }

    if (filterName !== "season") {
      setIsOpenSeason(false);
      setSeasonIconRotation(0);
    }
  };

  // 지역별 검색
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpenLocation(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpenLocation(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // 기간별 검색
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpenPeriod(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpenPeriod(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // 계절별 검색
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpenSeason(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpenSeason(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <CategoryContainer>
      <CategoryFilterList>
        <CategoryFilterItem>
          <CategoryFilterButton
            onClick={() =>
              handleFilterButtonClick(
                "location",
                isOpenLocation,
                setIsOpenLocation,
                setLocationIconRotation
              )
            }
            onMouseEnter={handleLocationButtonHover}
            onMouseLeave={handleLocationButtonLeave}
            style={{
              color: isOpenLocation || isLocationHovered ? "#0475F4" : "black",
            }}
          >
            <KeyboardArrowDownIcon
              style={{ transform: `rotate(${locationIconRotation}deg)` }}
            />
            지역
          </CategoryFilterButton>
        </CategoryFilterItem>

        <CategoryFilterItem>
          <CategoryFilterButton
            onClick={() =>
              handleFilterButtonClick(
                "period",
                isOpenPeriod,
                setIsOpenPeriod,
                setPeriodIconRotation
              )
            }
            onMouseEnter={handlePeriodButtonHover}
            onMouseLeave={handlePeriodButtonLeave}
            style={{
              color: isOpenPeriod || isPeriodHovered ? "#0475F4" : "black",
            }}
          >
            <KeyboardArrowDownIcon
              style={{ transform: `rotate(${periodIconRotation}deg)` }}
            />
            기간
          </CategoryFilterButton>
        </CategoryFilterItem>

        <CategoryFilterItem>
          <CategoryFilterButton
            onClick={() =>
              handleFilterButtonClick(
                "season",
                isOpenSeason,
                setIsOpenSeason,
                setSeasonIconRotation
              )
            }
            onMouseEnter={handleThemeButtonHover}
            onMouseLeave={handleThemeButtonLeave}
            style={{
              color: isOpenSeason || isThemeHovered ? "#0475F4" : "black",
            }}
          >
            <KeyboardArrowDownIcon
              style={{ transform: `rotate(${seasonIconRotation}deg)` }}
            />
            계절
          </CategoryFilterButton>
        </CategoryFilterItem>
      </CategoryFilterList>

      {/* 지역별 검색 */}
      {isOpenLocation && (
        <LocationSearchArea>
          <LocationCheckboxArea>
            <LocationCheckbox>
              <input type="checkbox" id="서울" />
              <label htmlFor="서울">서울</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="경기도" />
              <label htmlFor="경기도">경기</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="강원도" />
              <label htmlFor="강원도">강원</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="충청북도" />
              <label htmlFor="충청북도">충북</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="충청남도" />
              <label htmlFor="충청남도">충남</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="경상북도" />
              <label htmlFor="경상북도">경북</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="경상남도" />
              <label htmlFor="경상남도">경남</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="전라북도" />
              <label htmlFor="전라북도">전북</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="전라남도" />
              <label htmlFor="전라남도">전남</label>
            </LocationCheckbox>
            <LocationCheckbox>
              <input type="checkbox" id="제주도" />
              <label htmlFor="제주도">제주</label>
            </LocationCheckbox>
          </LocationCheckboxArea>
          <LocationSearchButton>검색</LocationSearchButton>
        </LocationSearchArea>
      )}

      {/* 기간별 검색 */}
      {isOpenPeriod && (
        <PeriodSearchArea>
          <PeriodInputArea>
            <input type="date"></input>
            <p>~</p>
            <input type="date"></input>
          </PeriodInputArea>
          <PeriodSearchButton>검색</PeriodSearchButton>
        </PeriodSearchArea>
      )}

      {/* 계절별 검색 */}
      {isOpenSeason && (
        <SeasonSearchArea>
          <SeasonCheckboxArea>
            <SeasonCheckBox>
              <input type="checkbox" id="spring" />
              <label htmlFor="spring">봄</label>
            </SeasonCheckBox>
            <SeasonCheckBox>
              <input type="checkbox" id="summer" />
              <label htmlFor="summer">여름</label>
            </SeasonCheckBox>
            <SeasonCheckBox>
              <input type="checkbox" id="autumn" />
              <label htmlFor="autumn">가을</label>
            </SeasonCheckBox>
            <SeasonCheckBox>
              <input type="checkbox" id="winter" />
              <label htmlFor="winter">겨울</label>
            </SeasonCheckBox>
          </SeasonCheckboxArea>
          <SeasonSearchButton>검색</SeasonSearchButton>
        </SeasonSearchArea>
      )}
    </CategoryContainer>
  );
};
export default FestivalSearchCategory;
