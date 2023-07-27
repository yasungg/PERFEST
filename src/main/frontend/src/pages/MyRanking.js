import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const RankingCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  padding: 20px;
  width: 100%;
  max-width: 390px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 390px) {
    border-radius: 0;
  }
`;

const RankingNumber = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 20px;
`;

const RankingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RankingTitle = styled.h3`
  color: #666;
  margin-bottom: 10px;
`;



const MyRanking = () => {
  const [memberRichRanking, setMemberRichRanking] = useState("");
  const [memberBadgeRanking, setMemberBadgeRanking] = useState("");

  // 리치랭킹
  useEffect(() => {
    const fetchMemberRichRanking = async () => {
      const rsp = await MemberAPI.myRichRanking();
      if (rsp.status === 200) {
        setMemberRichRanking(rsp.data);
        console.log(`리치랭킹은 ${rsp.data}`);
      }
    };
    fetchMemberRichRanking();
  }, []);

  // 뱃지랭킹
  useEffect(() => {
    const fetchMemberBadgeRanking = async () => {
      const rsb = await MemberAPI.myBadgeRanking();
      if (rsb.status === 200) setMemberBadgeRanking(rsb.data);
      console.log(`뱃지랭킹은 ${rsb.data}`);
    };
    fetchMemberBadgeRanking();
  }, []);

  return (
    <Container>
      {console.log(memberRichRanking)}
      <Title>내 랭킹</Title>
      <RankingCard>
        <RankingNumber>R</RankingNumber>
        <RankingInfo>
          <RankingTitle>큰손 랭킹</RankingTitle>
          <p>현재 내 큰손랭킹은 {memberRichRanking}등 입니다.</p>
        </RankingInfo>
      </RankingCard>
      <RankingCard>
        <RankingNumber>B</RankingNumber>
        <RankingInfo>
          <RankingTitle>뱃지 랭킹</RankingTitle>
          <p>현재 내 뱃지랭킹은 {memberBadgeRanking}등 입니다.</p>
        </RankingInfo>
      </RankingCard>
    </Container>
  );
};

export default MyRanking;
