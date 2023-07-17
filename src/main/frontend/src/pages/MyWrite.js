import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberAPI from '../api/MemberAPI';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 18rem;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CardBody = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h5`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
`;

const ListGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const ListItem = styled.li`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
`;

const CardLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-right: 1rem;
`;

const PageBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  width: 100px;
  height: 35px;
  font-size: 0.8em;
  font-weight: bold;
  background-color: #2f4050;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: skyblue;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


function MyWrite() {
  const [memberWrite, setMemberWrite] = useState([]);
  let memberId = 1; // context로 가져올 예정
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMemberWrite = async () => {
      const response = await MemberAPI.getMyWrite(memberId);
      if (response.status === 200) {
        setMemberWrite(response.data);
      }
    };
    fetchMemberWrite();
  }, [memberId]);

  // 페이징 처리
  const startIndex = (page - 1) * 3;
  const endIndex = startIndex + 3;
  const paginatedData = memberWrite.slice(startIndex, endIndex);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
    <CardContainer>
      {paginatedData.map((write) => (
        <Card key={write.communityId}>
          <CardImage src={write.communityImgLink} alt="Card Image" />
          <CardBody>
            <CardTitle>{write.communityTitle}</CardTitle>
            <CardText>{write.communityDesc}</CardText>
          </CardBody>
          <ListGroup>
            <ListItem>Category: {write.communityCategory}</ListItem>
            <ListItem>좋아요: {write.likeCount}</ListItem>
            <ListItem>작성일: {write.writtenTime}</ListItem>
          </ListGroup>
          <CardBody>
            <CardLink href="#">게시글 보러가기</CardLink>
            <CardLink href="#">작성자 프로필 보기</CardLink>
          </CardBody>
        </Card>
      ))}
      <PageBtn>
        <PaginationButton onClick={previousPage} disabled={page === 1}>
          이전
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={endIndex >= memberWrite.length}>
          다음
        </PaginationButton>
      </PageBtn>
    </CardContainer>
    </>
  );
}

export default MyWrite;
