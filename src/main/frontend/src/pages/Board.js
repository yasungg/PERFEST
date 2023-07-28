import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import BoardAPI from "../api/BoardAPI";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../components/DateStyle";
import { FaHeart } from 'react-icons/fa';
import { UserContext } from "../context/UserStore";
import Pagination from "../components/Pagination.js";
import Header from "../components/Header";
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
`;
const SearchBoard = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  
   .select-box {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8; 
    color: #333; 
    cursor: pointer;
  }

  /* 선택 상자 드롭다운 스타일링 */
  .select-box select {
    background-color: transparent;
    border: none;
    appearance: none;
    outline: none;
    cursor: pointer;
  }
  .search {
    padding: 5px 10px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
  }

  .search-button {
    background-color: #007bff; 
    color: #fff; 
    padding: 5px 10px;
    border: none; 
    border-radius: 5px; 
    margin-left: 5px;
    cursor: pointer; 
  }
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  height: 70px;
`;

const CatButton = styled.button`
  font-size: 24px;
  height: 40px;
  min-width: 120px;
  background-color: ${({ isActive }) => (isActive ? "#FF6B6B" : "#F2F2F2")};
  color: ${({ isActive }) => (isActive ? "white" : "#333")};
  padding: 0 16px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#FF4545" : "#D8D8D8")};
    color: white;
    transform: scale(1.05);
  }
`;


const Arrange = styled.div` // 정렬 방법 선택 div(최신순, 인기순)
display: flex;
justify-content: flex-end;
align-items: center;
margin-top: 10px;
margin-bottom: 10px;
`;
const ArrButton = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  cursor: pointer;

  &:checked {
    border-color: black;
    background-color: black;
  }
  &:checked::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    display: block;
  }
`;
const Label = styled.label`
  font-size: 16px;
  color: #333333;
`;
const BoardText = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
`;

const BoardContents = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin-top: 7px;
  margin-bottom: 7px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f5f5f5;
  }
`;


const BCategory = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

const BTitle = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  color: #666666;
`;

const BNickName = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  color: #888888;
`;

const BTime = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  color: #888888;
`;
const BLikeCount = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  color: #888888;
  margin-right: 5px;
`;
const WriteButton = styled.div`
display: flex;
justify-content: flex-end;
height: 100%;
margin-top: 20px;
.write{
  border-style: none;
  border-radius: 5px;
  background-color: white;
  font-size: 22px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}
.write:hover {
    background-color: #f2f2f2;
}
  `;
const Heart = styled(FaHeart)`
  color: red;
  padding-right: 2px;
`;
const ChangeBtn = styled.button`
  display: flex;
  width: 40px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
  font-weight: 600;
  color: #222;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border: none;
  outline: none;
  background: white;
  margin-bottom: 8px;
`;
const NumBtnWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
`;
const Board = () => {
  const navigate = useNavigate();
  // const [selectedBoardInfo, setSelectedBoardInfo] = useState([]);
  const page = 0;
  const [selectCategory, setSelectCategory] = useState("");
  const [activeButton, setActiveButton] = useState(""); // 버튼의 활성화 여부를 저장하는 상태
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState('title'); // 기본적으로 제목 검색
  const [BoardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const {isLogin} = useContext(UserContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }
  const onChangeType = (e) => {
    setSearchType(e.target.value);
  }
  // -----------------------------------> 페이지네이션 상태관리
  //숫자 버튼을 누르면 숫자에 맞는 페이지 렌더링
  const renderThisPage = async(page) => {
    const getInfo = await BoardAPI.BoardGet(page)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setCurrentPage(page - 1);
            setBoardList(result.data.content);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  // 이전 버튼을 클릭했을 때 -1 페이지네이션의 결과를 요청
  const onClickPreviousPage = async () => {
    if (currentPage > 0) {
      const getPreviousPage = await BoardAPI.BoardGet(currentPage - 1)
          .then((result) => {
            if (result.status === 200) {
              console.log(result.data);
              console.log(result.data.content);
              setBoardList(result.data.content);
              setCurrentPage(currentPage - 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };
  // 다음 버튼을 클릭했을 때 +1 페이지네이션의 결과를 요청
  const onClickNextPage = async () => {
    if (currentPage + 1 < totalPages) {
      const getNextPage = await BoardAPI.BoardGet(currentPage + 1)
          .then((result) => {
            if (result.status === 200) {
              console.log(result.data);
              console.log(result.data.content);
              setBoardList(result.data.content);
              setCurrentPage(currentPage + 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };
  const getBoardList = async () => {
    const getInfo = await BoardAPI.BoardGet(currentPage)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setBoardList(result.data.content);
            setTotalPages(result.data.totalPages);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  //멤버 리스트 1페이지를 자동으로 렌더링
  useEffect(() => {
    getBoardList();
  }, [currentPage, totalPages]);

  // 게시판 전체 글 목록 가져오기
  // const BoardGetAll = async () => {
  //   const rsp = await BoardAPI.BoardGet();
  //   if (rsp.status === 200) setSelectedBoardInfo(rsp.data);
  //   console.log(rsp.data);
  // };
  //
  // useEffect(() => {
  //   BoardGetAll();
  // }, []);

  // 게시판 카테고리별 가져오기
  useEffect(() => {
    const onClickCategory = async() => {
      if (selectCategory) {
        const rsp = await BoardAPI.BoardGetByCategory(selectCategory);
        console.log(selectCategory);
        if (rsp.status === 200) setBoardList(rsp.data);
        console.log(rsp.data);
      }
    };
    onClickCategory();
  }, [selectCategory]);
  const getCategoryText = (category) => {
    switch (category) {
      case 'FIND_PARTY':
        return '파티원 찾기';
      case 'FREE_BOARD':
        return '자유게시판';
      case 'Q_A':
        return 'Q&A';
      default:
        return '';
    }
  };
  const handleCategoryClick = (category) => {
    setSelectCategory(category);
    setActiveButton(category); // 버튼이 클릭되면 해당 카테고리를 활성화 상태로 설정
  };
  // 게시판 최신순 정렬
  const onClickNewestBoard = async() => {
    if(selectCategory) {
      const rsp = await BoardAPI.BoardGetByNewest(selectCategory);
      if (rsp.status === 200) setBoardList(rsp.data);
      console.log(selectCategory);
      console.log(rsp.data);
    } else {
      const rsp = await BoardAPI.BoardGetAllByNewest();
      setBoardList(rsp.data);
    }
  }
  // 게시판 인기순 정렬
  const onClickLikestBoard = async() => {
    if(selectCategory) {
      const rsp = await BoardAPI.BoardGetByLikest(selectCategory);
      if (rsp.status === 200) setBoardList(rsp.data);
      console.log(rsp.data);
    } else {
      const rsp = await BoardAPI.BoardGetAllByLikest();
      setBoardList(rsp.data);
    }
  }
  // 게시판 제목 검색
  const searchByTitle = async() => {
    if(searchType === 'title') {
      const rsp = await BoardAPI.BoardSearchByTitle(search);
      if(rsp.status === 200) setBoardList(rsp.data);
    } else if(searchType === 'nickname'){
      const rsp2 = await BoardAPI.BoardSearchByNickName(search);
      if(rsp2.status === 200) setBoardList(rsp2.data);
    }
  }
  const boardClick = (communityId) => {
    navigate(`/pages/BoardArticle/${communityId}`);
  }
  return (
      <Container justifyContent="center" alignItems="center">
        <Header/>
        <BodyContainer>
          <Title>커뮤니티</Title>
          <SearchBoard>
            <select className="select-box" value={searchType} onChange={onChangeType}>
              <option value="title">제목</option>
              <option value="nickname">닉네임</option>
            </select>
            <input type="text" className="search" placeholder="제목 또는 닉네임으로 검색하세요"value={search} onChange={onChangeSearch}/>
            <button className="search-button" onClick={searchByTitle}>검색</button>
          </SearchBoard>
          <Category>
            <CatButton
                isActive={activeButton === ""}
                onClick={() => {
                  getBoardList();
                  handleCategoryClick("");
                }}
            >
              전체
            </CatButton>
            <CatButton
                isActive={activeButton === "FREE_BOARD"}
                onClick={() => handleCategoryClick("FREE_BOARD")}
            >
              자유게시판
            </CatButton>
            <CatButton
                isActive={activeButton === "Q_A"}
                onClick={() => handleCategoryClick("Q_A")}
            >
              Q&A
            </CatButton>
            <CatButton
                isActive={activeButton === "FIND_PARTY"}
                onClick={() => handleCategoryClick("FIND_PARTY")}
            >
              파티원 찾기
            </CatButton>
          </Category>
          <Arrange>
            <ArrButton>
              <RadioButton type="radio" name="arrange" id="newest" onClick={onClickNewestBoard} />
              <Label htmlFor="newest">최신순</Label>
            </ArrButton>
            <ArrButton>
              <RadioButton type="radio" name="arrange" id="likest" onClick={onClickLikestBoard}/>
              <Label htmlFor="likest">인기순</Label>
            </ArrButton>
          </Arrange>
          {BoardList.map((community) => (
              <BoardText key={community.communityId}>
                <BoardContents onClick={() => boardClick(community.communityId)}>
                  <BCategory>{getCategoryText(community.communityCategory)}</BCategory>
                  <BTitle>{community.communityTitle}</BTitle>
                  <BNickName>{community.nickname}</BNickName>
                  <BTime>{formatDate(community.writtenTime)}</BTime>
                  <BLikeCount><Heart />{community.likeCount}</BLikeCount>
                </BoardContents>
              </BoardText>
          ))}
          <ButtonWrapper>
            <ChangeBtn onClick={onClickPreviousPage}>이전</ChangeBtn>
            <NumBtnWrapper>
              <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={renderThisPage}
              />
            </NumBtnWrapper>
            <ChangeBtn onClick={onClickNextPage}>다음</ChangeBtn>
          </ButtonWrapper>
          <WriteButton>
            {isLogin ? 
            (<button className="write" onClick={()=> navigate("/pages/WriteBoard")}>글쓰기</button>):
            (<button className="write" onClick={()=> navigate("/pages/Login")}>글쓰기</button>)}
            </WriteButton>
        </BodyContainer>
      </Container>
  );
};

export default Board;