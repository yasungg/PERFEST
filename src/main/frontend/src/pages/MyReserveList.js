import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  width: 100%;


  p {
    font-size: 1.3em;
    font-weight: bold;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
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

  th, td {
    padding: 20px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: .9em;
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

  tbody tr{

    &:hover{
    background-color: #F1F0F0;
   }
  }

  td {
    text-align: center;
    font-size: .75em;
    color: #636363;
  }
`;


const MyReserveList = () => {
  // const context = UserContext(UserContext);
  // const { memberId } = context; // 로그인후 컨텍스트담아올예정
  let memberId = 1;

  const [memberReserve, setMemberReserve] = useState([]);

  useEffect(() => {
    const fetchMemberReservation = async () => {
      const rsp = await MemberAPI.getReservation(memberId);
      if (rsp.status === 200) setMemberReserve(rsp.data);
    };
    fetchMemberReservation();
  }, [memberId]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return(
    <>
    <Container>
      <p>예매 내역</p>
      <hr/>
      <li>체험활동 관련 문의는 해당 축제 관리자에게 연락바랍니다</li>
      <li>예매 취소는 해당 체험활동일 전까지만 가능합니다</li>
      <table>
        <thead>
          <tr>
            <th>체험 활동</th>
            <th>상세정보</th>
            <th>시작일</th>
            <th>종료일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberReserve.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.activityName}</td>
              <td>{reservation.activityDesc}</td>
              <td>{formatTime(reservation.startDate)}</td>
              <td>{formatTime(reservation.endDate)}</td>
              <td><button>취소</button></td>
            </tr>
          ))}
        </tbody>
      </table>


    </Container>
    </>
  )
};

export default MyReserveList;
