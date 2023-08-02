import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import HistoryItem from "./HistoryItem";
import TimelineLoader from "./TimelineLoader";

const TimelineWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  background-color: #edf1f5;
  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    position: fixed;
    right: -4px;
    width: 6px;
    background: white;
    border-radius: 2px;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
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
  width: calc(100% - 16px);
  height: fit-content;
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
          console.error("에러", error);
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
              <span className="date"> 알람 </span>
            </li>
            {noticeInfo &&
              noticeInfo.map((notice, key) => (
                <HistoryItem key={key} data={notice} />
              ))}
          </Timelines>
        )}
      </TimelineWrap>
    </>
  );
};

export default Timeline;
