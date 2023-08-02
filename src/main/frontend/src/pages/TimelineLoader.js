import React from "react";
import styled from "styled-components";
import Loading from "../images/PerfestLoading.gif"
// const Skeleton = styled.div`
//   overflow: hidden;
//   width: 268px;
//   height: 20px;
//   position: relative;
//   background: #f6f6f6;
//   border-radius: 2px;
//   display: inline-block;
//   margin-top: 5px;
//   @media screen and (max-width: 769px) {
//     min-width: 200px;
//   }
// `;

// const TimelinesByDate = styled.ul`
//   list-style: none;
//   width: calc(100% - 32px);
//   height: fit-content;
//   margin: 0 16px;
//   padding: 0;
//   overflow-y: hidden;
// `;

// const History = styled.li`
//   display: flex;
//   flex-direction: row;
//   margin: 5px 0;
//   padding: 15px;
//   background-color: #fff;
//   border-radius: 10px;
// `;
const LoadingBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoadingImg = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
`;
const TimelineLoader = () => {
    return (
        // <TimelinesByDate>
        //   <Skeleton style={{ width: "100px", height: "20px", margin: "20px 0" }} />
        //   {Array.from({ length: 7 }, (_, idx) => (
        //     <History
        //       key={idx}
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         marginTop: "5px",
        //       }}
        //     >
        //       <Skeleton
        //         style={{
        //           width: "40px",
        //           height: "40px",
        //           borderRadius: "50%",
        //           flexShrink: "0",
        //           marginRight: "10px",
        //         }}
        //       />
        //       <div>
        //         <Skeleton />
        //         <Skeleton />
        //         <Skeleton style={{height: "15px" }} />
        //       </div>
        //     </History>
        //   ))}
        // </TimelinesByDate>
        <LoadingBackground>
          <LoadingImg src={Loading}/>
        </LoadingBackground>
      );
    }

export default TimelineLoader;