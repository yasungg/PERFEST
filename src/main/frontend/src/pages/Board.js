import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import BoardAPI from "../api/BoardAPI";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../components/DateStyle";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../context/UserStore";
import Header from "../components/Header";
import ImageIcon from "@mui/icons-material/Image";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import Sidebar from "../components/Sidebar";
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
    width: 64px;
    height: 24px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
    cursor: pointer;
    @media screen and (max-width: 769px) {
      width: 14vw;
      height: 2.5vh;
      font-size: 6px;
    }
    @media screen and (max-width: 376px) {
      width: 14vw;
      height: 3vh;
      font-size: 6px;
    }
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
    box-sizing: border-box;
    padding: 4px 0 4px 8px;
    border: 1px solid #ccc;
    width: 240px;
    height: 24px;
    border-radius: 3px;
    font-size: 12px;
    @media screen and (max-width: 769px) {
      width: 20vw;
      height: 2.5vh;
      font-size: 6px;
      padding: 2px 0 2px 4px;
    }
    @media screen and (max-width: 376px) {
      width: 20vw;
      height: 3vh;
      font-size: 6px;
    }
  }

  .search-button {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    width: 60px;
    height: 24px;
    border: none;
    border-radius: 5px;
    margin-left: 5px;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 769px) {
      width: 10vw;
      height: 2.5vh;
      font-size: 6px;
    }
    @media screen and (max-width: 376px) {
      width: 10vw;
      height: 3vh;
      font-size: 6px;
    }
  }
`;
const Category = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  align-self: center;
  height: 70px;
  @media screen and (max-width: 769px) {
    width: 90vw;
  }
`;

const CatButton = styled.button`
  font-size: 18px;
  height: 40px;
  width: 120px;
  background-color: ${({ isActive }) => (isActive ? "#222" : "#F2F2F2")};
  color: ${({ isActive }) => (isActive ? "white" : "#333")};
  transition: background-color 0.3s ease-in-out;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "royalblue" : "#D8D8D8")};
    color: white;
    transform: scale(1.05);
  }
  @media screen and (max-width: 769px) {
    width: 18vw;
    font-size: 13px;
    height: 3.5vh;
  }
`;

const Arrange = styled.div`
  // 정렬 방법 선택 div(최신순, 인기순)
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 769px) {
    width: 90vw;
  }
`;
const ArrButtonBox = styled.div`
  display: flex;
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
  @media screen and (max-width: 769px) {
    width: 4vw;
    height: 4vw;
    padding: 2px 0 2px 4px;
  }
`;
const Label = styled.label`
  margin-left: 4px;
  font-size: 16px;
  color: #333333;
  @media screen and (max-width: 769px) {
    font-size: 12px;
    font-weight: 500;
    margin-left: 2px;
  }
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
const BoardBoxForMobile = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 90vw;
  height: 80px;
  border: none;
  border-radius: 3px;
  align-self: center;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const LeftBox = styled.div`
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  padding: 4px;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: calc(100% - 80px);
  height: 80px;
  justify-content: center;
  padding-left: 4px;
  .title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  .category {
    color: #999;
    font-size: 8px;
    margin-bottom: 4px;
  }
`;
const BoardInfoBox = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 12px;
  font-size: 12px;
`;
const BoardPictureBox = styled.div`
  box-sizing: border-box;
  width: 72px;
  height: 72px;
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;
const BoardPicture = styled.img`
  width: 72px;
  height: 72px;
  transition: all 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
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
  .write {
    border-style: none;
    border-radius: 5px;
    background-color: white;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
  }
  .write:hover {
    background-color: #f2f2f2;
  }
  @media screen and (max-width: 769px) {
    margin-bottom: 32px;
  }
`;
const Heart = styled(FaHeart)`
  color: red;
  padding-right: 2px;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  background-color: ${(props) => (props.active ? "#222" : "#f6f6f6")};
  color: ${(props) => (props.active ? "white" : "#666")};
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  border-radius: 5px;
  margin: 0 5px;
`;
const Board = () => {
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState("");
  const [activeButton, setActiveButton] = useState(""); // 버튼의 활성화 여부를 저장하는 상태
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title"); // 기본적으로 제목 검색
  const [boardList, setBoardList] = useState([]);
  const [boardPage, setBoardPage] = useState(1);
  const [mQuery, setMQuery] = useState(window.innerWidth < 769 ? true : false);
  const ITEMS_PER_PAGE = 10;
  const { isLogin } = useContext(UserContext);

  const boardTotalPages = boardList.length / 10 + 1;
  // 현재 페이지에 해당하는 시작 인덱스와 끝 인덱스를 계산합니다.
  const startIndex = (boardPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  //미디어 쿼리에 따른 컴포넌트 상태변화
  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width:769px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const handleBoardPageChange = (page) => {
    setBoardPage(page);
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const onChangeType = (e) => {
    setSearchType(e.target.value);
  };

  // 게시판 전체 글 목록 가져오기
  const BoardGetAll = async () => {
    const rsp = await BoardAPI.BoardGet();
    if (rsp.status === 200) setBoardList(rsp.data);
  };

  useEffect(() => {
    BoardGetAll();
  }, []);

  // 게시판 카테고리별 가져오기
  useEffect(() => {
    const onClickCategory = async () => {
      if (selectCategory) {
        const rsp = await BoardAPI.BoardGetByCategory(selectCategory);
        if (rsp.status === 200) setBoardList(rsp.data);
      }
    };
    onClickCategory();
  }, [selectCategory]);
  const getCategoryText = (category) => {
    switch (category) {
      case "FIND_PARTY":
        return "파티원 찾기";
      case "FREE_BOARD":
        return "자유게시판";
      case "Q_A":
        return "Q&A";
      default:
        return "";
    }
  };
  const handleCategoryClick = (category) => {
    setSelectCategory(category);
    setActiveButton(category); // 버튼이 클릭되면 해당 카테고리를 활성화 상태로 설정
  };
  // 게시판 최신순 정렬
  const onClickNewestBoard = async () => {
    if (selectCategory) {
      const rsp = await BoardAPI.BoardGetByNewest(selectCategory);
      if (rsp.status === 200) setBoardList(rsp.data);
    } else {
      const rsp = await BoardAPI.BoardGetAllByNewest();
      setBoardList(rsp.data);
    }
  };
  // 게시판 인기순 정렬
  const onClickLikestBoard = async () => {
    if (selectCategory) {
      const rsp = await BoardAPI.BoardGetByLikest(selectCategory);
      if (rsp.status === 200) setBoardList(rsp.data);
    } else {
      const rsp = await BoardAPI.BoardGetAllByLikest();
      setBoardList(rsp.data);
    }
  };
  // 게시판 제목 검색
  const searchByTitle = async () => {
    if (searchType === "title") {
      const rsp = await BoardAPI.BoardSearchByTitle(search);
      if (rsp.status === 200) setBoardList(rsp.data);
    } else if (searchType === "nickname") {
      const rsp2 = await BoardAPI.BoardSearchByNickName(search);
      if (rsp2.status === 200) setBoardList(rsp2.data);
    }
  };
  const boardClick = (communityId) => {
    navigate(`/pages/BoardArticle/${communityId}`);
  };
  return (
    <Container justifyContent="center" alignItems="center">
      <Header />
      <BodyContainer>
        <Title>커뮤니티</Title>

        <Category>
          <CatButton
            isActive={activeButton === ""}
            onClick={() => {
              BoardGetAll();
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
          <SearchBoard>
            <select
              className="select-box"
              value={searchType}
              onChange={onChangeType}
            >
              <option value="title">제목</option>
              <option value="nickname">닉네임</option>
            </select>
            <input
              type="text"
              className="search"
              placeholder="제목 또는 닉네임으로 검색하세요"
              value={search}
              onChange={onChangeSearch}
            />
            <button className="search-button" onClick={searchByTitle}>
              검색
            </button>
          </SearchBoard>
          <ArrButtonBox>
            <ArrButton>
              <RadioButton
                type="radio"
                name="arrange"
                id="newest"
                onClick={onClickNewestBoard}
              />
              <Label htmlFor="newest">최신순</Label>
            </ArrButton>
            <ArrButton>
              <RadioButton
                type="radio"
                name="arrange"
                id="likest"
                onClick={onClickLikestBoard}
              />
              <Label htmlFor="likest">인기순</Label>
            </ArrButton>
          </ArrButtonBox>
        </Arrange>
        {mQuery
          ? boardList.slice(startIndex, endIndex).map((boardItem) => (
              <BoardBoxForMobile
                onClick={() => boardClick(boardItem.communityId)}
                key={boardItem.communityId}
              >
                <LeftBox>
                  <BoardPictureBox>
                    {boardItem.communityImgLink ? (
                      <BoardPicture src={boardItem.communityImgLink} />
                    ) : (
                      <BoardPicture
                        src={BlackLogo}
                        style={{ opacity: "0.6" }}
                      />
                    )}
                  </BoardPictureBox>
                </LeftBox>
                <RightBox>
                  <span className="title">{boardItem.communityTitle}</span>
                  <span className="category">
                    {getCategoryText(boardItem.communityCategory)}
                  </span>
                  <BoardInfoBox>
                    <span>{boardItem.nickname}</span> |{" "}
                    <span>{formatDate(boardItem.writtenTime)}</span>
                    <Heart
                      style={{
                        margin: "0 2px 0 32px",
                        transform: "translateY(2px)",
                      }}
                    />
                    {boardItem.likeCount}
                  </BoardInfoBox>
                </RightBox>
              </BoardBoxForMobile>
            ))
          : boardList.slice(startIndex, endIndex).map((boardItem) => (
              <BoardText key={boardItem.communityId}>
                <BoardContents
                  onClick={() => boardClick(boardItem.communityId)}
                >
                  <BCategory>
                    {getCategoryText(boardItem.communityCategory)}
                  </BCategory>
                  <BTitle>
                    {boardItem.communityImgLink && (
                      <ImageIcon
                        style={{
                          fontSize: "18px",
                          color: "royalblue",
                          userSelect: "none",
                        }}
                      />
                    )}
                    {boardItem.communityTitle}
                  </BTitle>
                  <BNickName>{boardItem.nickname}</BNickName>
                  <BTime>{formatDate(boardItem.writtenTime)}</BTime>
                  <BLikeCount>
                    <Heart />
                    {boardItem.likeCount}
                  </BLikeCount>
                </BoardContents>
              </BoardText>
            ))}
        <Pagination>
          {Array.from({ length: boardTotalPages }, (_, index) => (
            <PaginationButton
              key={index}
              active={boardPage === index + 1}
              onClick={() => handleBoardPageChange(index + 1)}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </Pagination>
        <WriteButton>
          {isLogin ? (
            <button
              className="write"
              onClick={() => navigate("/pages/WriteBoard")}
            >
              글쓰기
            </button>
          ) : (
            <button className="write" onClick={() => navigate("/pages/Login")}>
              글쓰기
            </button>
          )}
        </WriteButton>
      </BodyContainer>
      <Sidebar />
    </Container>
  );
};

export default Board;
