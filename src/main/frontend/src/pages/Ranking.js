import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import RankingAPI from "../api/RankingAPI";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px; 
  height: 100%; 
`;

const RankingCategory = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const RankButton = styled.div`
  margin: 0 10px;
  cursor: pointer;

  label {
    display: inline-block;
    padding: 10px 20px; 
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: #333;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + label {
    background-color: #333;
    color: #fff;
  }
`;

const RankingDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 50%;
  margin-top: 30px;
`;

const BadgeRankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`;

const RankingRank = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-right: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const RankingNickName = styled.div`
  font-size: 18px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RankingNum = styled.div`
  font-size: 18px;
  color: #555;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Ranking = () => {
  const [richRanking, setRichRanking] = useState([]);
  const [badgeRanking, setBadgeRanking] = useState([]);
  const [isGetBadgeRankingClicked, setGetBadgeRankingClicked] = useState(false);

  const getRichRanking = async () => {
    const response = await RankingAPI.GetRichRanking();
    setRichRanking(response.data);
    setGetBadgeRankingClicked(false);
  };
  const getBadgeRanking = async () => {
    const response = await RankingAPI.GetBadgeRanking();
    setBadgeRanking(response.data);
    setGetBadgeRankingClicked(true);
  };
  useEffect(() => {
    getBadgeRanking();
  }, []);
  return (
      <Container justifyContent="center" alignItems="center">
        <Header/>
        <BodyContainer>
          <RankContainer>
            <RankingCategory>
              <RankButton onClick={getBadgeRanking}>
                <input type="radio" name="rankingCategory" id="badge" />
                <label htmlFor="badge">뱃지 랭킹</label>
              </RankButton>
              <RankButton onClick={getRichRanking}>
                <input type="radio" name="rankingCategory" id="rich" />
                <label htmlFor="rich">큰손 랭킹</label>
              </RankButton>
            </RankingCategory>
            <RankingDesc>
              {isGetBadgeRankingClicked
                  ? badgeRanking.map((badgeRank) => (
                      <BadgeRankInfo key={`badge-${badgeRank.memberId}`}>
                        <RankingRank>{badgeRank.rank}</RankingRank>
                        <RankingNickName>{badgeRank.nickname}</RankingNickName>
                        <RankingNum>{badgeRank.badges}</RankingNum>
                      </BadgeRankInfo>
                  ))
                  : richRanking.map((richRank) => (
                      <BadgeRankInfo key={`rich-${richRank.memberId}`}>
                        <RankingRank>{richRank.rank}</RankingRank>
                        <RankingNickName>{richRank.nickname}</RankingNickName>
                        <RankingNum>{richRank.totalPrice}</RankingNum>
                      </BadgeRankInfo>
                  ))}
            </RankingDesc>
          </RankContainer>
        </BodyContainer>
      </Container>
  );
};

export default Ranking;
