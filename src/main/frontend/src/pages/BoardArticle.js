import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState } from "react";
import CommentAPI from "../api/CommentAPI";
import { useEffect } from "react";
import BoardAPI from "../api/BoardAPI";
import { useParams } from "react-router";
import {formatDate} from "../components/DateStyle";
import {GoHeart} from 'react-icons/go'
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;
const BoardInfo = styled.div`
`;
const BoardTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const BoardNickname = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 18px;
`;

const BoardDate = styled.div`
  color: #666;
  font-size: 14px;
`;
const BoardDesc = styled.div`
  display: flex;
  margin-top: 20px;
  height: 300px;
  width: 97%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  font-size: 16px;
  color: #333;
  overflow: auto;
`;

const CommentInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`;
const CommentCount = styled.div`
  font-size: 16px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const CommentWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
.commentwrite {
    width: 85%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
  }
`;
const CommentWriteButton = styled.button`
  width: 10%;
  padding: 8px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const CommentDesc = styled.div`
display: flex;
flex-direction: column;
`;
const Comment = styled.div`
margin-top: 5px;
margin-bottom: 5px;
`;
const CommentHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentNickName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const CommentWrittenTime = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: 10px;
`;

const CommentReWrite = styled.div`
  .replycomment {
    border: none;
    background-color: white;
    border-radius: 4px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const CommentLike = styled.div`
  .like {
    border: none;
    background-color: white;
    border-radius: 4px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;
const CommentArr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentBody = styled.div`
  font-size: 17px;
  color: #333;
`;

const CommentLikeCount = styled.div`
  font-size: 14px;
  color: #666;
`;
const CommentReplyWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
.commentreply{
    width: 85%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
  }
`;
const CommentReplyWriteButton = styled.button`
  width: 10%;
  padding: 8px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const BoardLike = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .like-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 999px;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const Heart = styled(GoHeart)`
    color: red;
`;




const BoardArticle = () => {
    const {communityId} = useParams(); // 게시판 번호 전달 하기 위해서 useparams 사용
    const [inputComment, setInputComment] = useState("");
    const [inputReplyComment, setInputReplyComment] = useState("");
    const [commentCount, setCommentCount] = useState("");
    const [boardArticle, setBoardArticle] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [commentUpdateTrigger, setCommentUpdateTrigger] = useState(false); // 댓글 업데이트를 트리거하는 상태 추가

    const onChangeComment = (e) => {
        setInputComment(e.target.value);
    }
    // 게시판 댓글 작성
    const onClickWriteComment = async() => {
        if (inputComment.trim() === "") {
            // textarea 내용이 비어 있는 경우
            return;
          }
        const memberId = 1;
        const response = await CommentAPI.CommentWrite(inputComment,communityId,memberId);
        console.log(response.data);
        setCommentUpdateTrigger(prev => !prev);
        setInputComment(""); // 댓글 작성 후 inputComment 상태를 초기화하여 textarea의 내용을 지움
    }
    // 게시판에 있는 댓글 갯수 가져오기
    useEffect(() => {
    const getCommentCount = async() =>{
        const rsp = await CommentAPI.CommentGetCount(communityId);
        setCommentCount(rsp.data);
    }
    getCommentCount();
    },[commentUpdateTrigger])
    // 게시판 본문 가져오기
    useEffect(() => {
    const getBoardArticle = async() => {
        const response = await BoardAPI.GetBoardArticle(communityId);
        console.log(response.data);
        setBoardArticle(response.data);
    }
    getBoardArticle();
    },[communityId])
    // 게시판 공감하기 눌르면 공감하기 1 추가
    const onClickBoardLike = async() => {
        const response = await BoardAPI.AddBoardLike(communityId);
        console.log(response.data);
    }
    // 댓글 좋아요 눌르면 댓글 좋아요 1 추가
    const onClickCommentLike  = async(commentId) => {
        console.log(commentId);
        const response = await CommentAPI.AddCommentLike(commentId);
        console.log(response.data);
    }
    // 해당 게시판 댓글 가져오기
    useEffect(() => {
    const getBoardComment = async() => {
        const response = await CommentAPI.GetComment(communityId);
        console.log(response.data);
        setCommentData(response.data);
    }
    getBoardComment();
    },[commentUpdateTrigger])
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
      // 게시판 대댓글 작성
      const onClickWriteReplyComment = async(commentId) => {
        const memberId = 2;
        const response = await CommentAPI.ReplyCommentWrite(commentId,memberId,inputReplyComment);
          console.log(response.data);
          setInputReplyComment(""); // 대댓글 작성 후 inputReplyComment 상태를 초기화하여 textarea의 내용을 지움
      };
      const onChangeReplyComment = (e) => {
        setInputReplyComment(e.target.value);
      };
    return(
        <Container justifyContent="center" alignItems="center">
            <BodyContainer>
            {boardArticle&&boardArticle.map((community) => (
                <BoardInfo key={community.communityId}>
                <Title><h1>{getCategoryText(community.communityCategory)}</h1></Title> 
                <BoardTitle>{community.communityTitle}</BoardTitle>
                <UserInfo>
                    <BoardNickname>{community.nickname}</BoardNickname>
                    <BoardDate>{formatDate(community.writtenTime)}</BoardDate>
                </UserInfo>
                <hr></hr>
                <BoardDesc>{community.communityDesc}</BoardDesc>
                </BoardInfo>
                ))}
                <CommentInfo>
                <CommentCount>댓글{commentCount}</CommentCount>
                </CommentInfo>
                <CommentWrite>
                    <textarea className="commentwrite"  cols="160" rows="3" value={inputComment} onChange={onChangeComment}></textarea>
                    <CommentWriteButton onClick={onClickWriteComment}>댓글 작성하기</CommentWriteButton>
                </CommentWrite>
                {commentData&&commentData.map((comment) => (
                <CommentDesc key={comment.commentId}>
                    <Comment>
                    <CommentHead>
                        <CommentNickName>{comment.nickname}</CommentNickName>
                        <CommentWrittenTime>{formatDate(comment.commentWrittenTime)}</CommentWrittenTime>
                        <CommentReWrite><button className="replycomment" onClick={() => onClickWriteReplyComment(comment.commentId)}>대댓글</button></CommentReWrite>
                        <CommentLike><button className="like" onClick={() => onClickCommentLike(comment.commentId)}>좋아요</button></CommentLike>
                    </CommentHead>
                    <CommentArr>
                    <CommentBody>{comment.commentBody}</CommentBody>
                    <CommentLikeCount><Heart/>{comment.commentLikeCount}</CommentLikeCount>
                    </CommentArr>
                    <CommentReplyWrite>
                    <textarea className="commentreply" cols="160" rows="3" value={inputReplyComment} onChange={onChangeReplyComment}></textarea>
                    <CommentReplyWriteButton>댓댓글 작성하기</CommentReplyWriteButton>
                     </CommentReplyWrite>
                    <hr></hr>
                    </Comment>
                </CommentDesc>
                ))}
                <BoardLike>
                    <button className="like-button" onClick={onClickBoardLike}>
                    이 글이 도움!
                    </button></BoardLike>
            </BodyContainer>
        </Container>
    );
};
export default BoardArticle;