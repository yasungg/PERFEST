import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal";

const Container = styled.div`
  width: 100%;

  p {
    font-size: 1.3em;
    font-weight: bold;
  }

  hr {
    background-color: lightgray;
    border: 0.3px solid lightgray;
    margin-bottom: 20px;
  }

  li {
    font-size: 0.7em;
    color: darkgray;
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  button {
    font-size: 0.8em;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background-color: #ff4136;
    color: white;
    padding: 8px 16px;
    margin-right: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #dc352d;
    }

    &:active {
      transform: translateY(2px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }

  th,
  td {
    padding: 20px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: 0.9em;
    &:nth-child(1) {
      width: 40%;
    }
    &:nth-child(2) {
      width: 20%;
    }
    &:nth-child(3) {
      width: 20%;
    }
  }

  tbody tr {
    &:hover {
      background-color: #f1f0f0;
    }
  }

  td {
    text-align: center;
    font-size: 0.75em;
    color: #636363;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
    transition: max-width 0.3s ease;

    &.expanded {
      max-width: 100%;
    }
  }
`;

const MyReview = () => {
  const [memberReview, setMemberReview] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // const context = UserContext(UserContext);
  // const { memberId } = context; // 로그인후 컨텍스트로 받아올예정
  let memberId = 1;

  useEffect(() => {
    const fetchMemberReview = async () => {
      const rsp = await MemberAPI.getReview(memberId);
      if (rsp.status === 200) setMemberReview(rsp.data);
    };
    fetchMemberReview();
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

  const deleteMyReview = async (reviewId) => {
    setDeleteModalOpen(true);
    setReviewToDelete(reviewId);
  };

  const confirm = async (modalType) => {
    if (modalType === "deleteReview") {
      const response = await MemberAPI.deleteReviewSelection(reviewToDelete);
      console.log(response.data);

      const updatedReviewList = memberReview.filter(
        (review) => review.reviewId !== reviewToDelete
      );
      setMemberReview(updatedReviewList);
    }

    setDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const toggleExpanded = (event) => {
    event.currentTarget.classList.toggle("expanded");
  };

  return (
    <Container>
      <p>내 리뷰</p>
      <hr />
      <li>최신순으로 보여집니다</li>
      <table>
        <thead>
          <tr>
            <th>사진</th>
            {/* <th>제목</th> */}
            <th>내용</th>
            <th>작성일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberReview.map((review) => (
            <tr key={review.id}>
              <td>
                <img src={review.reviewImg} alt="Review" />
              </td>
              <td onClick={toggleExpanded}>{review.reviewContent}</td>
              <td>{formatTime(review.reviewWrittenTime)}</td>
              <td>
                <button onClick={() => deleteMyReview(review.reviewId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={deleteModalOpen}
        type={true}
        close={closeModal}
        confirm={() => confirm("deleteReview")}
        header="리뷰삭제"
      >
        정말 삭제하시겠습니까?
      </Modal>
    </Container>
  );
};

export default MyReview;
