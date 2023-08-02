import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState, useEffect } from "react";
import BoardAPI from "../api/BoardAPI";
import { useNavigate } from "react-router";
import ImageUploader from "../components/ImageUploader.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  user-select: none;
`;
const WriteTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  margin-top: 30px;
  user-select: none;
  .boardTitle {
    font-size: 18px;
    margin-right: 10px;
  }
  .writeTitle {
    height: 30px;
    width: 70%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease-in-out;
    box-sizing: border-box;
    @media screen and (max-width: 769px) {
      width: 100%;
      font-size: 12px;
    }
  }
  .writeTitle:focus {
    outline: none;
    border-color: #222;
  }
`;
const WriteCategory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;

  .boardTitle {
    display: flex;
    font-size: 24px;
  }
`;

const CategoryRadio = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 70%;
  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
  }

  input[type="radio"] {
    margin-right: 5px;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 1px solid #888888;
    border-radius: 50%;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background-color: royalblue;
    border: 1px solid royalblue;
  }
  input[type="radio"]:checked::after {
    content: "";
    top: 6px;
    left: 6px;
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
  }
  @media screen and (max-width: 769px) {
    width: 100%;
    justify-content: space-between;
  }
`;
const WriteText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  .writeText {
    box-sizing: border-box;
    width: 70%;
    height: 500px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    outline: none;
    resize: none;
    font-size: 16px;

    @media screen and (max-width: 769px) {
      width: 100%;
      height: 300px;
      font-size: 12px;
    }
  }
  .writeText:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;
const WriteImage = styled.div``;
const WriteButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  font-size: 20px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #222;
  color: white;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    background-color: royalblue;
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
const LeftLabel = styled.label`
  display: inline-box;
  width: 20%;
  font-size: 16px;
  font-weight: 600;
`;
const WriteBoard = () => {
  const navigate = useNavigate();
  const [inputBoardTitle, setInputBoardTitle] = useState("");
  const [inputBoardText, setInputBoardText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // 업로드된 이미지 URL을 저장하는 상태 변수
  const [mQuery, setMQuery] = useState(window.innerWidth < 769 ? true : false);

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

  const handleImageUpload = (imageUrl) => {
    setUploadedImageUrl(imageUrl);
  };
  const onChangeBoardTitle = (e) => {
    setInputBoardTitle(e.target.value);
  };
  const onChangeBoardText = (e) => {
    setInputBoardText(e.target.value);
  };
  const onChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  // 게시판 작성하기
  const onClickWriteBoard = async () => {
    const response = await BoardAPI.BoardWrite(
      inputBoardTitle,
      selectedCategory,
      inputBoardText,
      uploadedImageUrl
    );
    console.log(response.data);
    setInputBoardTitle("");
    setSelectedCategory("");
    setInputBoardText("");

    if (response.data === true) {
      console.log(response.data);
      navigate("/pages/Board");
    } else {
      console.log(response.data);
    }
  };
  return (
    <Container justifyContent="center" alignItems="center">
      <Header />
      <BodyContainer>
        <Title>
          <h1>게시글 작성</h1>
        </Title>
        <WriteTitle>
          {mQuery || <LeftLabel htmlFor="boardTitle">글 제목</LeftLabel>}
          <input
            type="text"
            className="writeTitle"
            id="boardTitle"
            placeholder="30자 이내로 입력하세요"
            value={inputBoardTitle}
            onChange={onChangeBoardTitle}
          />
        </WriteTitle>
        <WriteCategory>
          {mQuery || <LeftLabel htmlFor="boardCategory">글 분류</LeftLabel>}
          <CategoryRadio>
            <label htmlFor="freeBoard">
              <input
                type="radio"
                name="category"
                value="FREE_BOARD"
                checked={selectedCategory === "FREE_BOARD"}
                onChange={onChangeCategory}
              />
              자유게시판
            </label>
            <label htmlFor="Q&A">
              <input
                type="radio"
                name="category"
                value="Q_A"
                checked={selectedCategory === "Q_A"}
                onChange={onChangeCategory}
              />
              Q&A
            </label>
            <label htmlFor="findParty">
              <input
                type="radio"
                name="category"
                value="FIND_PARTY"
                checked={selectedCategory === "FIND_PARTY"}
                onChange={onChangeCategory}
              />
              파티원 찾기
            </label>
          </CategoryRadio>
        </WriteCategory>
        <WriteText>
          {mQuery || <LeftLabel htmlFor="writeText">글 작성</LeftLabel>}
          <textarea
            name="writeText"
            className="writeText"
            cols="120"
            rows="30"
            value={inputBoardText}
            placeholder="내용을 입력하세요."
            onChange={onChangeBoardText}
          ></textarea>
        </WriteText>
        <WriteImage>
          <ImageUploader onImageUpload={handleImageUpload} />
        </WriteImage>
        <WriteButton>
          <Button onClick={onClickWriteBoard}>작성</Button>
          <Button onClick={() => navigate("/pages/Board")}>취소</Button>
        </WriteButton>
      </BodyContainer>
      <Sidebar />
    </Container>
  );
};
export default WriteBoard;
