import Logo from "../images/PERFEST LOGO BLACK.png";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Slider2 = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background: transparent;
`;
const Video = styled.video`
  position: absolute;
  width: 1440px;
  border: none;
  outline: none;
  overflow: hidden;
  z-index: 0;
`;
const SecondSlider = () => {
  return (
    <Slider2>
      <Video
        muted
        autoPlay
        loop
        src="/static/media/BackgroundVideo2.mp4"
        type="video/mp4"
      ></Video>
    </Slider2>
  );
};
export default SecondSlider;
