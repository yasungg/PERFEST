import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import HistoryItem from "./HistoryItem";
import TimelineLoader from "./TimelineLoader";

const TimelineWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  overflow-y: scroll;
  border: 1px solid #bbbbbb;
  border-radius: 30px;
  padding-top: 20px;
  background-color: #edf1f5;
`;

const Button = styled.button`
  border: none;
  background: #fff;
  border-radius: 15px;
  padding: 7px;
  width: 120px;
  font-weight: 600;
  color: #6b8eb3;
  cursor: pointer;
`;

const Timelines = styled.ul`
  list-style: none;
  width: 400px;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  overflow-y: hidden;
`;

const Timeline = () => {
  const [noticeInfo, setNoticeInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticeInfo = () => {
      new Promise((resolve) => setTimeout(resolve, 2000))
        .then(async () => {
          const response = await MemberAPI.getNotice();
          if (response.status === 200) {
            setNoticeInfo(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("", error);
        });
    };
    fetchNoticeInfo();
  }, []);

  return (
    <>
      <TimelineWrap>
        {loading ? (
          <TimelineLoader noticeInfo={noticeInfo} />
        ) : (
          <Timelines>
            <li className="date_block">
              <span className="date"> 알람  </span>
            </li>
            {noticeInfo.map((notice, key) => (
              <HistoryItem key={key} data={notice} />
            ))}
          </Timelines>
        )}
      </TimelineWrap>
    </>
  );
};

export default Timeline;
