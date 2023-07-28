import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import FestivalAPI from "../api/FestivalAPI";
import festivalPoster2 from "../images/2023안양충훈벚꽃축제.jpg";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateForFestival } from "./DateStyle";
import { useNavigate } from "react-router";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
const SearchContainer = styled.div`
  box-sizing: border-box;
  display: inline-block;
  min-width: 364px;
  max-width: 364px;
  height: calc(100vh - 58px);
  background-color: #fff;
  overflow-y: hidden;
  z-index: 3;
  box-shadow: 1px 0px 5px 0px #555555;
  transition: all 0.3s ease-in;
  @media screen and (max-width: 767px) {
    position: absolute;
    width: 100vw;
    max-width: 100vw;
    height: 40vh;
    bottom: ${(props) => props.bottom};
    box-shadow: none;
    /* border-top-right-radius: 10px;
    border-top-left-radius: 10px; */
  }
  @media screen and (max-width: 375px) {
    position: absolute;
    width: 100vw;
    max-width: 100vw;
    height: 50vh;
    bottom: ${(props) => props.bottom};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
`;
const SearchArea = styled.div`
  display: flex;
  width: 100%;
  height: 8%;
  min-height: 80px;
  background: rgba(255, 255, 255, 0);
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    display: none;
  }
  /* box-shadow: 5px 0 5px -5px #333; */
  /* border-bottom: 1px solid lightgray; */
`;

const InputBoxArea = styled.div`
  display: flex;
  width: 90%;
  height: 36px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  /* linear-gradient(to right, #7E2BFE, #23C3F4); */
  align-items: center;
  background-origin: border-box;
  background-clip: content-box, border-box;
  outline: none;
  font-size: 13px;
  box-shadow: 1px 1px 4px -1px #555555;
  margin: 0px -5px;
`;

const SearchInputBox = styled.input`
  width: 83%;
  height: 32px;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 13px;
  margin-left: 15px;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px 3px 3px 8px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: none;

  border-radius: 5px;
  .searchIcon {
    transition: all 0.1s ease-in;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .searchIcon {
    transform: scale(1.2);
  }
`;
const Xbox = styled.div`
  width: 100%;
  height: 40px;
  display: none;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  @media screen and (max-width: 767px) {
    display: flex;
  }
`;
const Xbtn = styled.button`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
  &:hover .xIcon {
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;
const PerfestLogo = styled.img`
  height: 100%;
  user-select: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;
const ListContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 92%;
  min-height: 80;
  margin-top: auto;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;

  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    position: fixed;
    right: -4px;
    width: 6px;
    background: white;
    border-radius: 2px;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
`;

const Result = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 24px;
  /* min-height: 40px; */
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 8px;
  font-size: 14px;
`;

const ResultSort = styled.ol`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  li:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: lightgray;
    margin: 0px 5px;
  }
`;

const SortByDateOrDistance = styled.li`
  display: inline-block;
  list-style: none;

  span {
    font-size: 12px;
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: #0475f4;
    }
  }
`;

const CardList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0 8px;
`;

const CardWrap = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  background-color: #fff;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
`;

const CardInner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
  }

  &:hover img {
    transform: scale(1.1);
    position: relative;
  }
`;

const ImageArea = styled.div`
  position: relative;
  grid-row: 1 / span 2;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 120px;
    margin: 0 10px 0 8px;
    transition: transform 0.3s ease;
  }
`;

const TextArea = styled.div`
  grid-column: 2;
  grid-row: 1;
  margin: 10px 8px 10px 0;
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #222;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    margin: 10px 0;
    margin-right: 20px;
  }
`;

const ContentArea = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  background-color: #e2f6ff;
  border-radius: 10px;
  width: 96%;
  cursor: pointer;

  &:hover {
    background-color: #e2f6ff;
  }

  p,
  .address {
    margin: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 보여줄 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const FestivalCardBtns = styled.div`
  width: auto;
  height: auto;
  display: flex;
  .left {
    margin-right: 8px;
  }
`;
const LocationButton = styled.button`
  width: auto;
  height: auto;
  background: none;
  outline: none;
  border: none;
  font-size: 12px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const SearchSideBar = () => {
  const navigate = useNavigate();
  const [festival, setFestival] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalElements, setTotalElements] = useState("");
  const [mQuery, setMQuery] = useState(window.innerWidth < 769 ? true : false);
  const {
    setContextLongitude,
    setContextLatitude,
    setCenterLatitude,
    setCenterLongitude,
    centerLatitude,
    centerLongitude,
    searchBoxMove,
    setSearchBoxMove,
    contextFestivalSearch,
    setFestDetailBoxMove,
    setFestDetailBoxMoveY,
    setDetailComponentValue,
    setContextFstvlNm,
  } = useContext(UserContext);

  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width:769px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  //마커에 전달할 위도, 경도 값을 저장하기 위한 배열
  const latitudeArr = [];
  const longitudeArr = [];
  const fstvlNmArr = [];
  const searchDefaultByFestivalName = async () => {
    const search = await FestivalAPI.GetSearchResultByFestivalName(
      searchKeyword,
      0
    ).then((result) => {
      console.log(result);
      console.log(result.data.content);

      setFestival(result.data.content);
      setTotalElements(result.data.totalElements);

      //마커 찍기 위한 위도 경도 배열을 콘텍스트에 전달
      for (let i = 0; i < result.data.content.length; i++) {
        latitudeArr.push(result.data.content[i].latitude);
        longitudeArr.push(result.data.content[i].longitude);
        fstvlNmArr.push(result.data.content[i].fstvlNm);
      }
      setContextFstvlNm(fstvlNmArr);
      setContextLatitude(latitudeArr);
      setContextLongitude(longitudeArr);
    });
  };
  //카드를 클릭하면 해당 마커의 위치로 지도 위치를 이동시키기 위한 context 설정
  const setCenterMarker = (latitude, longitude) => {
    setCenterLatitude(latitude);
    setCenterLongitude(longitude);
    console.log(latitude);
    console.log(longitude);
    console.log(centerLatitude, centerLongitude);
  };
  // 검색창 Enter 검색
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchDefaultByFestivalName();
    }
  };
  // 데스크탑 모드에서 자세히 보기를 누르면 detail 페이지로 festival id를 전달
  const giveIdToDetail = (id) => {
    setFestDetailBoxMove("364px");
    setDetailComponentValue(id);
  };
  const giveIdToDetailY = (id) => {
    setFestDetailBoxMoveY("6vh");
    setDetailComponentValue(id);
  };

  useEffect(() => {
    const searchFromHeader = async () => {
      const search = await FestivalAPI.GetSearchResultByFestivalName(
        contextFestivalSearch,
        0
      ).then((result) => {
        console.log(result);
        console.log(result.data.content);

        setFestival(result.data.content);
        setTotalElements(result.data.totalElements);
        //마커 찍기 위한 위도 경도 배열을 콘텍스트에 전달
        for (let i = 0; i < result.data.content.length; i++) {
          latitudeArr.push(result.data.content[i].latitude);
          longitudeArr.push(result.data.content[i].longitude);
        }

        setContextLatitude(latitudeArr);
        setContextLongitude(longitudeArr);
      });
    };
    searchFromHeader();
  }, [contextFestivalSearch]);
  return (
    <SearchContainer bottom={searchBoxMove}>
      <SearchArea>
        <InputBoxArea>
          <SearchInputBox
            value={searchKeyword}
            type="text"
            placeholder="찾을 지역이나 축제 이름을 입력하세요."
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton type="submit" onClick={searchDefaultByFestivalName}>
            <SearchIcon className="searchIcon" />
          </SearchButton>
        </InputBoxArea>
      </SearchArea>
      <Xbox>
        <PerfestLogo src={BlackLogo} />
        <Xbtn>
          <CloseIcon
            className="xIcon"
            style={{ color: "#222" }}
            onClick={() => setSearchBoxMove("-100vh")}
          />
        </Xbtn>
      </Xbox>

      {/* 검색 결과 */}

      <ListContainer>
        {totalElements ? (
          <Result>
            <p>검색된 결과 '{totalElements}'개가 있습니다.</p>
            <ResultSort>
              <SortByDateOrDistance>
                <span>날짜순</span>
              </SortByDateOrDistance>
              <SortByDateOrDistance>
                <span>거리순</span>
              </SortByDateOrDistance>
            </ResultSort>
          </Result>
        ) : (
          <Result>
            <p>검색된 결과가 없습니다.</p>
            <ResultSort>
              <SortByDateOrDistance>
                <span>날짜순</span>
              </SortByDateOrDistance>
              <SortByDateOrDistance>
                <span>거리순</span>
              </SortByDateOrDistance>
            </ResultSort>
          </Result>
        )}

        {/* 결과 카드 */}
        <CardList>
          {festival &&
            festival.map((e, idx) => (
              <CardWrap key={idx}>
                <CardInner>
                  <ImageArea>
                    <img src={festivalPoster2} alt="festival_poster" />
                  </ImageArea>
                  <TextArea>
                    <h4>{e.fstvlNm}</h4>
                    <p>시작일: {formatDateForFestival(e.fstvlStartDate)}</p>
                    <p>종료일: {formatDateForFestival(e.fstvlEndDate)}</p>
                    <p className="address">
                      {e.rdnmadr ? e.rdnmadr : e.lnmadr}
                    </p>
                    <p>{e.phoneNumber}</p>
                    <FestivalCardBtns>
                      <LocationButton
                        className="left"
                        onClick={() => setCenterMarker(e.latitude, e.longitude)}
                      >
                        위치보기
                      </LocationButton>
                      {mQuery ? (
                        <LocationButton onClick={() => giveIdToDetailY(e.id)}>
                          자세히 보기
                        </LocationButton>
                      ) : (
                        <LocationButton onClick={() => giveIdToDetail(e.id)}>
                          자세히 보기
                        </LocationButton>
                      )}
                    </FestivalCardBtns>
                  </TextArea>
                  <ContentArea>
                    <p>{e.fstvlCo}</p>
                  </ContentArea>
                </CardInner>
              </CardWrap>
            ))}
        </CardList>
      </ListContainer>
    </SearchContainer>
  );
};
export default SearchSideBar;
