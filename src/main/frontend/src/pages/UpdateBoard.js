import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState } from "react";
import BoardAPI from "../api/BoardAPI";
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
.writeTitle{
    height: 30px;
    width: 70%;
}
`;
const WriteCategory = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
font-size: 20px;
margin-top: 15px;
margin-bottom: 15px;
.boardTitle{
    display: flex;
    font-size: 24px;
}
`;
const CategoryRadio = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 70%;
`;
const WriteText = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
font-size: 24px;
.writeText{
    width: 70%;
}
`;
const WriteButton = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
margin-bottom: 20px;
`;
const Button = styled.button`
border-style: none;
font-size: 20px;
margin: 10px;
background-color: white;
&:hover{
    cursor: pointer;
}
`;
const UpdateBoard = () => {
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
    const onClickUpdateBoard = async() => {
        const response = await BoardAPI.BoardUpdate(inputBoardTitle,selectedCategory,inputBoardText);
        console.log(response.data);
        if(response.data === true) {
            console.log(response.data);
        }
        else {
            console.log(response.data);
        };
    };
    return(
        <Container justifyContent="center" alignItems="center">
            <BodyContainer>
                <Title><h1>게시글 수정</h1></Title>
                <WriteTitle>
                    <label for="boardTitle">글 제목</label>
                    <input type="text" className="writeTitle" id="boardTitle" value={inputBoardTitle} onChange={onChangeBoardTitle}/>
                </WriteTitle>
                <WriteCategory>
                    <label for="boardCategory" className="boardTitle">글 분류</label>
                <CategoryRadio>
                    <label for="freeBoard">
                        <input type="radio" name="category"  value="FREE_BOARD" checked={selectedCategory === "FREE_BOARD"} onChange={onChangeCategory}/>
                        자유게시판
                        </label>
                    <label for="Q&A">
                        <input type="radio" name="category" value="Q_A" checked={selectedCategory === "Q_A"} onChange={onChangeCategory}/>
                        Q&A
                        </label>
                    <label for="findParty">
                        <input type="radio" name="category" value="FIND_PARTY" checked={selectedCategory === "FIND_PARTY"} onChange={onChangeCategory}/>
                        파티원 찾기
                        </label>
                        </CategoryRadio>
                </WriteCategory>
                <WriteText>
                    <label for="writeText">글 작성</label>
                    <textarea name="writeText" className="writeText" cols="120" rows="30" value={inputBoardText} onChange={onChangeBoardText}></textarea>
                </WriteText>
                <WriteButton>
                    <Button onClick={onClickUpdateBoard}>수정</Button>
                    <Button>취소</Button>
                </WriteButton>
            </BodyContainer>
        </Container>
    );
}
export default UpdateBoard;