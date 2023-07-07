import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import RankingAPI from "../api/RankingAPI";
import { useState } from "react";

const RankingCategory = styled.div`
  display: flex;
  justify-content: center;
`;

const RankButton = styled.div``;

const RankingDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BadgeRankInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const RankingRank = styled.div``;

const RankingNickName = styled.div``;

const RankingNum = styled.div``;

const Ranking = () => {
  const [richRanking, setRichRanking] = useState([]);
  const [badgeRanking, setBadgeRanking] = useState([]);
  const [isGetBadgeRankingClicked, setGetBadgeRankingClicked] = useState(false);

  const getRichRanking = async () => {
    const response = await RankingAPI.GetRichRanking();
    console.log(response.data);
    setRichRanking(response.data);
    setGetBadgeRankingClicked(false);
  };

  const getBadgeRanking = async () => {
    const response = await RankingAPI.GetBadgeRanking();
    console.log(response.data);
    setBadgeRanking(response.data);
    setGetBadgeRankingClicked(true);
  };

  return (
    <Container justifyContent="center" alignItems="center">
      <BodyContainer>
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
      </BodyContainer>
    </Container>
  );
};

export default Ranking;
