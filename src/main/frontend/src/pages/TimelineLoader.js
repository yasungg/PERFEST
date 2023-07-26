import React from "react";
import styled from "styled-components";

const Skeleton = styled.div`
  overflow: hidden;
  position: relative;
  background: #f6f6f6;
  border-radius: 2px;
  display: inline-block;
  margin-top: 5px;
`;

const TimelinesByDate = styled.ul`
  list-style: none;
  width: 400px;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  overflow-y: hidden;
`;

const History = styled.li`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
`;

const TimelineLoader = () => {
    return (
        <TimelinesByDate>
          <Skeleton style={{ width: "100px", height: "20px", margin: "20px 0" }} />
          {Array.from({ length: 7 }, (_, idx) => (
            <History
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Skeleton
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  flexShrink: "0",
                  marginRight: "10px",
                }}
              />
              <div>
                <Skeleton style={{ width: "300px", height: "20px" }} />
                <Skeleton style={{ width: "300px", height: "20px" }} />
                <Skeleton style={{ width: "100px", height: "15px" }} />
              </div>
            </History>
          ))}
        </TimelinesByDate>
      );
    }

export default TimelineLoader;