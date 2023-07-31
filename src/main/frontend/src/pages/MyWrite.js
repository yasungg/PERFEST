import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberAPI from '../api/MemberAPI';
import Header from "../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ColumnContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BoxContainer = styled.div`
  background-color: #f6f6f6;
  padding: 20px;
  width: 100%;
  max-width: 390px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 390px) {
    border-radius: 0;
    margin-bottom: 0;
  }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  background-color: ${(props) => (props.active ? '#ff4136' : '#f6f6f6')};
  color: ${(props) => (props.active ? 'white' : '#666')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  border-radius: 5px;
  margin: 0 5px;
`;

function MyWrite() {
  const [memberWrite, setMemberWrite] = useState([]);
  const [memberComment, setMemberComment] = useState([]);
  const [writePage, setWritePage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);


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

  const writeTotalPages = memberWrite.length;
  const commentTotalPages = memberComment.length;

  const handleWritePageChange = (page) => {
    setWritePage(page);
  };

  const handleCommentPageChange = (page) => {
    setCommentPage(page);
  };


  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
  <Container>
    <Header />
      <ColumnContainer>
        <BoxContainer>
          <Title>내 게시글</Title>
          {memberWrite[writePage - 1] && (
            <Item key={memberWrite[writePage - 1]?.communityId}>
              <strong>{memberWrite[writePage - 1].communityTitle}</strong>
              <Content>{memberWrite[writePage - 1].communityDesc}</Content>
              <Content>카테고리: {memberWrite[writePage - 1].communityCategory}</Content>
              <Content>좋아요: {memberWrite[writePage - 1].likeCount}</Content>
              <Content>작성시간: {formatTime(memberWrite[writePage - 1].writtenTime)}</Content>
            </Item>
          )}
          <Pagination>
            {Array.from({ length: writeTotalPages }, (_, index) => (
              <PaginationButton
                key={index}
                active={writePage === index + 1}
                onClick={() => handleWritePageChange(index + 1)}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </Pagination>
        </BoxContainer>
        <BoxContainer>
          <Title>내 댓글</Title>
          {memberComment[commentPage - 1] && (
            <Item key={memberComment[commentPage - 1]?.commentId}>
              <strong>{memberComment[commentPage - 1].commentBody}</strong>
              <Content>좋아요: {memberComment[commentPage - 1].commentLikeCount}</Content>
              <Content>작성시간: {formatTime(memberComment[commentPage - 1].commentWrittenTime)}</Content>
            </Item>
          )}
          <Pagination>
            {Array.from({ length: commentTotalPages }, (_, index) => (
              <PaginationButton
                key={index}
                active={commentPage === index + 1}
                onClick={() => handleCommentPageChange(index + 1)}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </Pagination>
        </BoxContainer>
      </ColumnContainer>
    </Container>
  );
}
export default MyWrite;