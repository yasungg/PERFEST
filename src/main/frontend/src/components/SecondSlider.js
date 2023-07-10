import Logo from "../images/PERFEST LOGO BLACK.png";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Slider2 = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background: transparent;
  overflow: hidden;
`;
const Video = styled.video`
  position: absolute;
  width: 1440px;
  border: none;
  outline: none;
  overflow: hidden;
  z-index: 0;
`;
const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  border: none;
  background: transparent;
  top: 75%;
  left: 50%;
  transform: translate(30%, -50%);
  @media screen and (max-width: 1025px) {
    left: 0%;
  }
`;
const SecondSliderSpan = styled.span`
  z-index: 1;
  font-weight: 800;
  font-size: calc(16px + 2vw);
  color: white;
`;
const SecondSlider = () => {
  return (
    <Slider2>
      <Video
        muted
        autoPlay
        loop
        src="/videos/BackgroundVideo2.mp4"
        type="video/mp4"
      ></Video>
      <SpanBox>
        <SecondSliderSpan className="secondSliderSpan1">
          지금까지 느껴본 적 없는
        </SecondSliderSpan>
        <SecondSliderSpan className="secondSliderSpan2">
          사용자 경험
        </SecondSliderSpan>
      </SpanBox>
    </Slider2>
  );
};
export default SecondSlider;
