import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState } from "react";
import BoardAPI from "../api/BoardAPI";
import { useNavigate } from "react-router";
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;
const WriteTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;

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
  }
  .writeTitle:focus {
    outline: none;
    border-color: #6c63ff;
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
  justify-content: space-around;
  align-items: center;
  width: 70%;

  label {
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
  }

  input[type="radio"] {
    margin-right: 5px;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #888888;
    border-radius: 50%;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background-color: #FF4545;
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
`;
const WriteText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  .writeText {
    width: 70%;
    height: 500px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    outline: none;
    resize: vertical;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
  .writeText:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;
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
  background-color: #FF6B6B;
  color: white;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    background-color: #FF4545;
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`
const WriteBoard = () => {
    const navigate = useNavigate();
    const [inputBoardTitle, setInputBoardTitle] = useState("");
    const [inputBoardText, setInputBoardText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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
    const onClickWriteBoard = async() => {
        const memberId = 1;
        const response = await BoardAPI.BoardWrite(inputBoardTitle,selectedCategory,inputBoardText,memberId);
        console.log(response.data);
        setInputBoardTitle("");
        setSelectedCategory("");
        setInputBoardText("");
        if(response.data === true) {
            console.log(response.data);
            navigate("/Board")
        }
        else {
            console.log(response.data);
        };
    };
    return(
        <Container justifyContent="center" alignItems="center">
            <BodyContainer>
                <Title><h1>게시글 작성</h1></Title>
                <WriteTitle>
                    <label htmlFor="boardTitle">글 제목</label>
                    <input type="text" className="writeTitle" id="boardTitle" value={inputBoardTitle} onChange={onChangeBoardTitle}/>
                </WriteTitle>
                <WriteCategory>
                    <label htmlFor="boardCategory" className="boardTitle">글 분류</label>
                <CategoryRadio>
                    <label htmlFor="freeBoard">
                        <input type="radio" name="category"  value="FREE_BOARD" checked={selectedCategory === "FREE_BOARD"} onChange={onChangeCategory}/>
                        자유게시판
                        </label>
                    <label htmlFor="Q&A">
                        <input type="radio" name="category" value="Q_A" checked={selectedCategory === "Q_A"} onChange={onChangeCategory}/>
                        Q&A
                        </label>
                    <label htmlFor="findParty">
                        <input type="radio" name="category" value="FIND_PARTY" checked={selectedCategory === "FIND_PARTY"} onChange={onChangeCategory}/>
                        파티원 찾기
                        </label>
                        </CategoryRadio>
                </WriteCategory>
                <WriteText>
                    <label htmlFor="writeText">글 작성</label>
                    <textarea name="writeText" className="writeText" cols="120" rows="30" value={inputBoardText} onChange={onChangeBoardText}></textarea>
                </WriteText>
                <WriteButton>
                    <Button onClick={onClickWriteBoard}>작성</Button>
                    <Button onClick={() =>navigate("/Board")}>취소</Button>
                </WriteButton>
            </BodyContainer>
        </Container>
    );
}
export default WriteBoard;