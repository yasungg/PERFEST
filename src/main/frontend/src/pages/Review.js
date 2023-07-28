import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import { formatDate } from "../components/DateStyle";
import ReviewAPI from "../api/ReviewAPI";
import { useState, useEffect, useContext } from "react";
import Pagination from "../components/Pagination.js";
import { UserContext } from "../context/UserStore";
import { Navigate, useNavigate } from "react-router";

const ReviewContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 96%;
  margin: 8px auto 16px auto;
  padding: 8px;
  background-color: #f1f1f1;
  /* border: 1px solid #ddd; */
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
  width: 15%;
  padding: 8px;
  background-color: #222;
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
const ChangeBtn = styled.button`
  display: flex;
  width: 40px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
  font-weight: 600;
  color: #222;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border: none;
  outline: none;
  background: white;
  margin-bottom: 8px;
`;
const NumBtnWrapper = styled.div`
  display: flex;
  width: auto;
  height: 24px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
`;
const Review = () => {
  const page = 0;
  const navigate = useNavigate();
  const { detailComponentValue, isLogin } = useContext(UserContext);
  const [inputReviewText, setInputReviewText] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [reviewCount, setReviewCount] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reviewUpdateTrigger, setReviewUpdateTrigger] = useState(false); // 리뷰 업데이트를 트리거하는 상태 추가
  const onChangeReview = (e) => {
    setInputReviewText(e.target.value);
  };
  // 리뷰 작성
  const onClickWriteReview = async () => {
    const response = await ReviewAPI.ReviewWrite(
      detailComponentValue,
      inputReviewText
    );
    console.log(response.data);
    setReviewUpdateTrigger((prev) => !prev);
    setInputReviewText("");
  };
  // 해당 축제의 리뷰 가져오기
  // useEffect(() => {
  //     const getFestivalReview = async() => {
  //         const response = await ReviewAPI.GetReview(festivalId);
  //         console.log(response.data);
  //         setReviewData(response.data);
  //         console.log(reviewData);
  //       };
  //     getFestivalReview();
  // },[reviewUpdateTrigger]);
  // -----------------------------------> 페이지네이션 상태관리
  //숫자 버튼을 누르면 숫자에 맞는 페이지 렌더링
  const renderThisPage = async (page) => {
    const getInfo = await ReviewAPI.GetReview(detailComponentValue, page)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          console.log(result.data.content);
          setCurrentPage(page - 1);
          setReviewData(result.data.content);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 이전 버튼을 클릭했을 때 -1 페이지네이션의 결과를 요청
  const onClickPreviousPage = async () => {
    if (currentPage > 0) {
      const getPreviousPage = await ReviewAPI.GetReview(
        detailComponentValue,
        currentPage - 1
      )
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setReviewData(result.data.content);
            setCurrentPage(currentPage - 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 다음 버튼을 클릭했을 때 +1 페이지네이션의 결과를 요청
  const onClickNextPage = async () => {
    if (currentPage + 1 < totalPages) {
      const getNextPage = await ReviewAPI.GetReview(
        detailComponentValue,
        currentPage + 1
      )
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            console.log(result.data.content);
            setReviewData(result.data.content);
            setCurrentPage(currentPage + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getReviewList = async () => {
    const getInfo = await ReviewAPI.GetReview(detailComponentValue, currentPage)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          console.log(result.data.content);
          setReviewData(result.data.content);
          setTotalPages(result.data.totalPages);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //멤버 리스트 1페이지를 자동으로 렌더링
  useEffect(() => {
    getReviewList();
  }, [currentPage, totalPages, reviewUpdateTrigger, detailComponentValue]);
  // 해당 축제의 리뷰 개수 가져오기
  useEffect(() => {
    const getReviewCount = async () => {
      const festivalId = 1;
      const response = await ReviewAPI.GetReviewCount(festivalId);
      console.log(response.data);
      setReviewCount(response.data);
    };
    getReviewCount();
  }, [reviewUpdateTrigger]);

  return (
    <Container justifyContent="center" alignItems="center">
      <ReviewContainer>
        <ReviewCount>
          <span style={{ marginRight: "8px" }}>리뷰</span>
          <span>{reviewCount}</span>
        </ReviewCount>
        <ReviewWriting>
          <textarea
            className="reviewwrite"
            cols="160"
            rows="3"
            value={inputReviewText}
            onChange={onChangeReview}
          ></textarea>
          {isLogin ?
          (<ReviewWriteButton onClick={onClickWriteReview}>
            리뷰 작성
          </ReviewWriteButton>) : (<ReviewWriteButton onClick={()=> navigate("/pages/Login")}>
            리뷰 작성
          </ReviewWriteButton>)}
        </ReviewWriting>
        {reviewData &&
          reviewData.map((review) => (
            <ReviewDesc key={review.reviewId}>
              <ReviewContent>{review.reviewContent}</ReviewContent>
              <ReviewNickName>{review.nickname}</ReviewNickName>
              <ReviewWrittenTime>
                {formatDate(review.reviewWrittenTime)}
              </ReviewWrittenTime>
            </ReviewDesc>
          ))}
        <ButtonWrapper>
          <ChangeBtn onClick={onClickPreviousPage}>이전</ChangeBtn>
          <NumBtnWrapper>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={renderThisPage}
            />
          </NumBtnWrapper>
          <ChangeBtn onClick={onClickNextPage}>다음</ChangeBtn>
        </ButtonWrapper>
      </ReviewContainer>
    </Container>
  );
};
export default Review;
