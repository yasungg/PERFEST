import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #FEFDFD;

  p {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
    margin-bottom: 20px;
  }

  li {
    font-size: 0.9em;
    color: darkgray;
    margin-bottom: 5px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  button {
    white-space: nowrap;
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

  th, td {
    padding: 15px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: .9em;
    text-align: left;
    &:nth-child(1) {
      width: 30%;
    }
    &:nth-child(2) {
      width: 40%;
    }
    &:nth-child(3) {
      width: 30%;
    }
  }

  tbody tr {
    &:hover {
      background-color: #F1F0F0;
    }
  }

  td {
    font-size: .8em;
    color: #636363;
  }

  /* 반응형 스타일링 */
  @media (max-width: 600px) {
    padding: 5px;

    p {
      font-size: 1.1em;
    }

    th, td {
      padding: 10px;
      font-size: 0.8em;
    }
    /* 확장된 설명 스타일 */
    .expanded-description {
      font-size: 0.8em;
      color: #636363;
      margin-top: 10px;
    }
  }
`;

const MyReserveList = () => {
  const [memberReserve, setMemberReserve] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  useEffect(() => {
    const reservation = async () => {
      const rsp = await MemberAPI.getReservation();
      if (rsp.status === 200) setMemberReserve(rsp.data);
    };
    reservation();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleExpandDescription = (reserveId) => {
    setExpandedDescriptionId(reserveId === expandedDescriptionId ? null : reserveId);
  };

  return (
    <Container>
      <p>예매 내역</p>
      <hr />
      <li>체험활동 문의는 관리자에게 문의 바랍니다.</li>
      <li>예매 취소는 해당 체험활동일 전까지만 가능합니다.</li>
      <table>
        <thead>
          <tr>
            <th>체험 활동</th>
            <th>상세정보</th>
            <th>기간</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberReserve && memberReserve.map(reserve => (
            <tr key={reserve.reserveId}>
              <td>{reserve.activityName}</td>
              <td>{reserve.activityDesc}</td>
              <td>
                {formatTime(reserve.startDate)} ~{" "}
                {formatTime(reserve.endDate)}
              </td>
              <td>
                <button>취소</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default MyReserveList;
