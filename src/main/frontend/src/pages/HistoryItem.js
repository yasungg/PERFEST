import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const History = styled.li`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 5px 0;
  padding: 15px;
  background-color: ${(props) => (props.clicked ? "#fff" : "#f6f6f6")};
  border-radius: 10px;
  cursor: pointer;

  .content_box {
    padding-left: 10px;
    display: inline-block;
    width: 100%;
  }
  .title {
    display: block;
    width: 100%;
  }
  .time {
    font-size: 12px;
    color: #6b8eb3;
    font-weight: 600;
  }
`;

const HistoryItem = ({ data }) => {

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const [clicked, setClicked] = useState(false);

  const handleItemClick = () => {
    setClicked(!clicked);
  };

  return (
    <History clicked={clicked} onClick={handleItemClick}>
      <div className="content_box">
        <strong className="title">M : </strong>
        {data.contents}
        <div className="time">{formatTime(data.created)}</div>
      </div>
    </History>
  );
};

export default HistoryItem;
