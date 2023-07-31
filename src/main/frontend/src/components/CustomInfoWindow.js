import React from "react";
import styled from "@emotion/styled";

const InfoWindowContainer = styled.div`
  box-sizing: border-box;
  width: auto;
  height: auto;
  display: flex;
  background-color: transparent;

`;

const InfoWindowInner = styled.div`
  position: relative;
  background: #FFF;
  width: auto;
  height: auto;
  border-radius: 5px;
  box-shadow: 1px 2px 3px #eee;
  border: 0.5px solid #222;
  padding: 20px;
  margin: 5px;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 11px 0 12.5px;
    border-color: #FFF transparent transparent transparent; /* 수정된 부분 */
    display: block;
    width: 0;
    z-index: 2;
    bottom: -14px;
    left: 47px;
  }

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 11px 0 12.5px;
    border-color: #222 transparent transparent transparent; /* 수정된 부분 */
    display: block;
    width: 0;
    z-index: 2;
    bottom: -15.5px;
    left: 47px;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
  }
  .desc {
    font-size: 11px;
  }
  .tel {
    font-size: 11px;
    color: #eee;
  }
`;



const CustomInfoWindow = () => {
  return(
      <InfoWindowContainer>
        <InfoWindowInner>
          <p className="title">군포철쭉축제</p>
          <p className="desc">경기도 군포시 고산로 451</p>
          <p className="tel">031-390-0063</p>
        </InfoWindowInner>
      </InfoWindowContainer>
  );
};
export default CustomInfoWindow;
