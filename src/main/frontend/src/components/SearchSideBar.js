import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "./StandardStyles";
import FestivalAPI from "../api/FestivalAPI";
import festivalPoster2 from "../images/2023안양충훈벚꽃축제.jpg";

const SearchContainer = styled.div`
	display: inline-block;
	max-width: 400px;
	min-width: 400px;
	height: 100vh;
	/* background: linear-gradient(to right, #654ea3, #eaafc8); */
	background-color: #FFF;
	overflow-y: hidden;
	z-index: 3;
	box-shadow: 1px 0px 5px 0px #555555;
`;
const SearchArea = styled.div`
  display: flex;
  width: 100%;
  height: 8%;
  min-height: 74.95px;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 0 5px -5px #333;
  border-bottom: 1px solid lightgray;
`;

const InputBoxArea = styled.div`
  display: flex;
  width: 90%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-image: linear-gradient(#FFF, #FFF),
  linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  /* linear-gradient(to right, #7E2BFE, #23C3F4); */
  background-origin: border-box;
  background-clip: content-box, border-box;
  outline: none;
  font-size: 13px;
  box-shadow: 1px 1px 4px -1px #555555;
  margin: 0px -5px;
`;

const SearchInputBox = styled.input`
  width: 83%;
  height: 43px;
  background-color: #FFF;
  border: none;
  outline: none;
  font-size: 13px;
  margin-left: 15px;
`;

const SearchButton = styled.button`
  margin: 3px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #FFF;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 4px -1px #555555;
`;

const ListContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 92%;
  min-height: 80;
  margin-top: auto;
  background-color: #FFF;
  overflow-y: auto;
  overflow-x: hidden;

  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 10px;
    background: #F4EBFF;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0px 0px 3px gray;
  }
`;

const Result = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  /* min-height: 40px; */
  align-items: center;
  justify-content: center;
  background-color: #FFF;
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

  a {
		font-size: 12px;
		text-decoration: none;
		color: black;

    &:hover {
      text-decoration: underline;
    }
	
	  &:active{
		  color: #0475F4;
	  }
  }
`;

const CardList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CardWrap = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  background-color: #FFF;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-bottom: 1px solid lightgray;
`;

const CardInner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  width: 350px;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
  }
`;

const ImageArea = styled.div`
  position: relative;
  grid-row: 1 / span 2;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 120px;
    margin-right: 10px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
	    position: relative;
    }
  }
`;

const TextArea = styled.div`
  grid-column: 2;
  grid-row: 1;
	margin: 10px 0;

  a {
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: #0475F4;
  }

  p {
    margin: 10px 0;
	  margin-right: 20px;
  }
`;

const ContentArea = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
	background-color: #FFF5FB;
	border-radius: 10px;
	cursor: pointer;

  &:hover {
    background-color: #F4EBFF;
  }

  p, .address {
    margin: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 보여줄 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


const SearchSideBar = () => {

  const [festival, setFestival] = useState([]);

  useEffect(() => {
    const FestivalInfo = async() => {
      try {
        const rsp = await FestivalAPI.getFestivalInfo();
        if(rsp.status === 200) setFestival(rsp.data);
      } catch (error) {
        console.error("Error while fetching festival information:", error);
      }
    }
    FestivalInfo();
  },[]);

  return(
      <SearchContainer>
        <SearchArea>
					<InputBoxArea>
						<SearchInputBox
              type="text"
              placeholder="찾을 지역이나 축제 이름을 입력하세요."
            />
						<SearchButton>돋보기</SearchButton>
					</InputBoxArea>
				</SearchArea>

        {/* 검색 결과 */}
        <ListContainer>
          <Result>
            <p>검색된 결과 '0'개가 있습니다.</p>
            {/* 결과 정렬버튼 */}
            <ResultSort>
              <SortByDateOrDistance>
                <a href="#none">날짜순</a>
              </SortByDateOrDistance>
              <SortByDateOrDistance>
                <a href="#none">거리순</a>
              </SortByDateOrDistance>
            </ResultSort>
          </Result>
          {/* 결과 카드 */}
          <CardList>
            {festival && festival.map((e, idx) => (
            <CardWrap key={idx}>
              <CardInner>
                <ImageArea>
                  <img src={festivalPoster2} alt="festival_poster"></img>
                </ImageArea>
                <TextArea>
                  <a href="#none"><strong>{e.festivalName}</strong></a>
                  <p>{e.startDate.substring(0, 10)} ~ {e.endDate.substring(0, 10)}</p>
                  <p className="address">{e.festivalLocation ? e.festivalLocation : e.festivalDoro}</p>
                  <p>{e.festivalTel}</p>
                </TextArea>
                <ContentArea>
                  <p>{e.festivalDesc}</p>
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