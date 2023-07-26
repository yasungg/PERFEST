import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MemberAPI from '../api/MemberAPI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const WriteContainer = styled.div`
  background-color: #f6f6f6;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 390px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 390px) {
    border-radius: 0;
    margin-bottom: 0;
  }
`;

const CommentContainer = styled.div`
  background-color: #f6f6f6;
  padding: 20px;
  width: 100%;
  max-width: 390px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;


const Item = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #666;
  margin-top: 5px;
`;

function MyWrite() {
  const [memberWrite, setMemberWrite] = useState([]);
  const [memberComment, setMemberComment] = useState([]);

   const writeObserverRef = useRef(null);
   const commentObserverRef = useRef(null);


   const [hasMoreWrite, setHasMoreWrite] = useState(true);
   const [hasMoreComment, setHasMoreComment] = useState(true);


   const [writePage, setWritePage] = useState(1);
   const [commentPage, setCommentPage] = useState(1);

  // 내가 쓴 댓글 가져오기
  useEffect(() => {
    const fetchMemberComment = async () => {
      try {
        const response = await MemberAPI.getComment();
        if (response.status === 200) {
          setMemberComment(response.data);
        }
      } catch (error) {
        console.error('', error);
      }
    };
    fetchMemberComment();
  }, []);

  // 내가 쓴 게시글 가져오기
  useEffect(() => {
    const fetchMemberWrite = async () => {
      try {
        const response = await MemberAPI.getMyWrite();
        if (response.status === 200) {
          setMemberWrite(response.data);
        }
      } catch (error) {
        console.error('', error);
      }
    };
    fetchMemberWrite();
  }, []);

  return (
    <Container>
      <WriteContainer>
        <Title>내가 쓴 게시글</Title>
        {memberWrite && memberWrite.map((write) => (
          <Item key={write.communityId}>
            <strong>{write.communityTitle}</strong>
            <Content>{write.communityDesc}</Content>
            <Content>카테고리: {write.communityCategory}</Content>
            <Content>좋아요: {write.likeCount}</Content>
            <Content>작성시간: {write.writtenTime}</Content>
          </Item>
        ))}
      </WriteContainer>
      <CommentContainer>
        <Title>내가 쓴 댓글</Title>
        {memberComment && memberComment.map((comment) => (
          <Item key={comment.commentId}>
            <strong>{comment.commentBody}</strong>
            <Content>좋아요: {comment.commentLikeCount}</Content>
            <Content>작성시간: {comment.commentWrittenTime}</Content>
          </Item>
        ))}
      </CommentContainer>
    </Container>
  );
}

export default MyWrite;
