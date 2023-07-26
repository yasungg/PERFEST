import Logo from "../images/PERFEST LOGO BLACK.png";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Slider1 = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
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
  color: ${(props) => props.color};
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
  @media screen and (max-width: 1025px) {
    display: none;
  }
`;
const HiddenImg = styled.img`
  position: absolute;
  width: 50vw;
  top: 50%;
  left: calc(50% - 1.5px);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`;
const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-18%, -50%);
  width: 48vw;
  height: 27vw;
  border: none;
  outline: none;
  overflow: hidden;
  z-index: 0;
`;
const SpanBox = styled.div`
  position: absolute;
  top: 28%;
  left: 12%;
  display: flex;
  .phrase1 {
    font-size: calc(16px + 3vw);
    font-weight: 500;
    z-index: 1;
    @media screen and (max-width: 1025px) {
      display: none;
    }
  }
  .phrase2 {
    margin-left: 16px;
    font-size: calc(16px + 3vw);
    font-weight: 500;
    z-index: 1;
    @media screen and (max-width: 1025px) {
      display: none;
    }
  }
`;
const FirstSlider = () => {
  return (
    <Slider1>
      <SpanBox>
        <span className="phrase1">대한민국의 모든</span>
        <span className="phrase2">축제</span>
      </SpanBox>
      <HiddenSpan fontSize="48px" top="48.5%" left="20%">
        이제,
      </HiddenSpan>
      <HiddenImg className="sliderImg1" src={Logo} alt="Slider1 이미지" />
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
