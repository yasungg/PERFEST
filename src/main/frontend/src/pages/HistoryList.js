import React from "react";
import styled from "styled-components";
import HistoryItem from "./HistoryItem";

const TimelinesByDate = styled.ul`
  list-style: none;
  width: 400px;
  height: fit-content;
  margin: 0 auto;
  padding: 0;

  .date_block {
    font-weight: 600;
    margin: 20px 0;
  }
`;


const HistoryList = ({ timeline }) => {
    return (
      <TimelinesByDate>
        {timeline.map((data, key) => (
          <HistoryItem key={key} data={data} />
        ))}
      </TimelinesByDate>
    );
  };

export default HistoryList;