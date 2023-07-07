import Logo from "../images/PERFEST LOGO BLACK.png";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Slider1 = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background: white;
  &:hover .sliderImg1 {
    opacity: 1;
  }
`;
const HiddenSpan = styled.span`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.weight};
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`;
const HiddenImg = styled.img`
  position: absolute;
  top: 37%;
  left: 25%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`;
const Video = styled.video`
  position: absolute;
  top: 23%;
  left: 41.7%;
  width: 640px;
  border: none;
  outline: none;
  overflow: hidden;
  z-index: 0;
`;
const FirstSlider = () => {
  return (
    <Slider1>
      <HiddenSpan fontSize="64px" top="28%" left="10%" weight="500">
        대한민국의 모든 축제
      </HiddenSpan>
      <HiddenSpan fontSize="48px" top="48.5%" left="20%">
        바로,
      </HiddenSpan>
      <HiddenImg className="sliderImg1" src={Logo} alt="Slider1 이미지" />
      <HiddenSpan fontSize="48px" top="48.5%" left="73%">
        에서.
      </HiddenSpan>
      <Video
        muted
        autoPlay
        loop
        src="/static/media/BackgroundVideo3.mp4"
        type="video/mp4"
      ></Video>
    </Slider1>
  );
};
export default FirstSlider;
