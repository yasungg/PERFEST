import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import { formatDate } from "../components/DateStyle";
import ReviewAPI from "../api/ReviewAPI";
import { useState } from "react";
import { useEffect } from "react";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-top: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewCount = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewWriting = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  textarea.reviewwrite {
    flex: 1;
    min-height: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
    outline: none;
  }
`;

const ReviewWriteButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-left: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3073bf;
  }
`;

const ReviewDesc = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewContent = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const ReviewNickName = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const ReviewWrittenTime = styled.div`
  font-size: 12px;
  color: #888;
`;
const Review = () => {
    const [inputReviewText, setInputReviewText] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [reviewCount, setReviewCount] = useState("");
    const [reviewUpdateTrigger, setReviewUpdateTrigger] = useState(false); // 리뷰 업데이트를 트리거하는 상태 추가
    const onChangeReview = (e) => {
        setInputReviewText(e.target.value);
    }
    // 리뷰 작성
    const onClickWriteReview = async() => {
        const festivalId = 1;
        const response = await ReviewAPI.ReviewWrite(festivalId, inputReviewText);
        console.log(response.data);
        setReviewUpdateTrigger(prev => !prev);
        setInputReviewText("");
    }
    // 해당 축제의 리뷰 가져오기
    useEffect(() => {
        const getFestivalReview = async() => {
            const festivalId = 1;
            const response = await ReviewAPI.GetReview(festivalId);
            console.log(response.data);
            setReviewData(response.data);
            console.log(reviewData);
          };
        getFestivalReview();
    },[reviewUpdateTrigger]);
    // 해당 축제의 리뷰 개수 가져오기
    useEffect(() => {
      const getReviewCount = async() => {
        const festivalId = 1;
        const response = await ReviewAPI.GetReviewCount(festivalId);
        console.log(response.data);
        setReviewCount(response.data);
      };
      getReviewCount();
    },[reviewUpdateTrigger]);
    return(
        <Container justifyContent="center" alignItems="center">
            <ReviewContainer>
              <ReviewCount>리뷰{reviewCount}</ReviewCount>
                <ReviewWriting>
                    <textarea className="reviewwrite"  cols="160" rows="3" value={inputReviewText} onChange={onChangeReview}></textarea>
                    <ReviewWriteButton onClick={onClickWriteReview}>리뷰 작성하기</ReviewWriteButton>
                </ReviewWriting>
                {reviewData && reviewData.map((review) => (
                <ReviewDesc key={review.reviewId}>
                  <ReviewContent>{review.reviewContent}</ReviewContent>
                  <ReviewNickName>{review.nickname}</ReviewNickName>
                  <ReviewWrittenTime>{formatDate(review.reviewWrittenTime)}</ReviewWrittenTime>
                  </ReviewDesc>
                ))}
            </ReviewContainer>
        </Container>
    )
}
export default Review;