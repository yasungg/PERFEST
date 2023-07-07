import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import MemberAPI from "../api/MemberAPI";
import axios from "axios";

const BodyContainer = styled.div`
  width: 100vw;
  
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PostContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Category = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 10px;
`;

const LikeCount = styled.p`
  font-size: 14px;
  color: #888;
`;

const WrittenTime = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#293846" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#293846")};
  border: 1px solid #293846;
  border-radius: 5px;
  cursor: pointer;
`;

const MyWrite = () => {
  // const context = useContext(UserContext);
  // const { memberId } = context; // 로그인후 컨텍스트로 가져올 예정
  let memberId = 1;

  const [memberWrite, setMemberWrite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  

  useEffect(() => {
    const memberInfo = async () => {
      const rsp = await MemberAPI.getMyWrite(memberId);
      if (rsp.status === 200) setMemberWrite(rsp.data);
    };
    memberInfo();
  }, [memberId]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 현재 페이지
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = memberWrite.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [delPost, setDelPost] = useState("");

  const onClickDelMyPost = () => {
    const rsd = MemberAPI.delMyWrite(memberId);
    if(rsd.status === 200) setDelPost(rsd.data);
    console.log(rsd.data);
  };

  

  return (
    <BodyContainer>
      <Container>
        {currentPosts.map((post) => (
          <PostContainer key={post.communityId}>
            <Title>{post.communityTitle}</Title>
            <Category>{post.communityCategory}</Category>
            <Description>{post.communityDesc}</Description>
            {post.communityImgLink && <Image src={post.communityImgLink} alt="Post Image" />}
            <LikeCount>Likes: {post.likeCount}</LikeCount>
            <WrittenTime>{formatTime(post.writtenTime)}</WrittenTime>
          </PostContainer>
        ))}
        <Pagination>
          {Array.from({ length: Math.ceil(memberWrite.length / postsPerPage) }, (_, index) => (
            <PageButton key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      </Container>
    </BodyContainer>
  );
};

export default MyWrite;

