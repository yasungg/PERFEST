import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import BoardAPI from "../api/BoardAPI";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../components/DateStyle";
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
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
  flex: 2;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  color: #666666;
`;

const BNickName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  color: #888888;
`;

const BTime = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  color: #888888;
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
const Board = () => {
    const navigate = useNavigate();
    const [selectedBoardInfo, setSelectedBoardInfo] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [activeButton, setActiveButton] = useState(""); // 버튼의 활성화 여부를 저장하는 상태

  
    // 게시판 전체 글 목록 가져오기
    const BoardGetAll = async () => {
        const rsp = await BoardAPI.BoardGet();
        if (rsp.status === 200) setSelectedBoardInfo(rsp.data);
        console.log(rsp.data);
      };
    
      useEffect(() => {
        BoardGetAll();
      }, []);
  
    // 게시판 카테고리별 가져오기
    useEffect(() => {
      const onClickCategory = async() => {
        if (selectCategory) {
          const rsp = await BoardAPI.BoardGetByCategory(selectCategory);
          if (rsp.status === 200) setSelectedBoardInfo(rsp.data);
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
        const rsp = await BoardAPI.BoardGetByNewest();
        setSelectedBoardInfo(rsp.data);
      }
    const boardClick = (communityId) => {
      navigate(`/BoardArticle/${communityId}`);
    }
    return (
      <Container justifyContent="center" alignItems="center">
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
          <ArrButton>
            <RadioButton type="radio" name="arrange" id="newest" onClick={onClickNewestBoard} />
            <Label htmlFor="newest">최신순</Label>
          </ArrButton>
          <ArrButton>
            <RadioButton type="radio" name="arrange" id="likest" />
            <Label htmlFor="likest">인기순</Label>
          </ArrButton>
            </Arrange>
          {selectedBoardInfo.map((community) => (
            <BoardText key={community.communityTitle}>
              <BoardContents onClick={() => boardClick(community.communityId)}>
                <BCategory>{getCategoryText(community.communityCategory)}</BCategory>
                <BTitle>{community.communityTitle}</BTitle>
                <BNickName>{community.nickname}</BNickName>
                <BTime>{formatDate(community.writtenTime)}</BTime>
              </BoardContents>
            </BoardText>
          ))}
          <WriteButton><button className="write" onClick={()=> navigate("/WriteBoard")}>글쓰기</button></WriteButton>
        </BodyContainer>
      </Container>
    );
  };
  
  export default Board;