import { Container, BodyContainer } from "../components/StandardStyles";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useLocation } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../images/PERFEST LOGO BLACK.png";
import FirstSlider from "../components/FirstSlider";
import { Banner } from "../components/Banner";

const VideoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px auto;
  position: relative;
  border: none;
  .whatFestival {
    display: inline-block;
    font-size: 48px;
    color: white;
    position: absolute;
    /* top: 200px;
    left: 335px; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    transition: all 0.7s linear;
  }
  &:hover .whatFestival {
    top: 42%;
    left: 33%;
  }
  &:hover .sbcontainer {
    opacity: 1;
    width: 768px;
  }
  @media screen and (max-width: 1025px) {
    &:hover .whatFestival {
      top: 42%;
      left: 45%;
    }
    &:hover .sbcontainer {
      opacity: 1;
      width: 400px;
    }
  }
`;
const Video = styled.video`
  width: 1440px;
  border: none;
  outline: none;
  z-index: 0;
  overflow: hidden;
`;
const SearchBoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 160px;
  height: 58px;
  border-radius: 10px;
  border: 1px solid white;
  background: transparent;
  align-items: center;
  align-self: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.7s ease-out;
  opacity: 0;
  &:focus {
    opacity: 1;
    width: 768px;
  }
`;
const SearchBox = styled.input`
  box-sizing: border-box;
  width: 90%;
  height: 80%;
  margin: 0 10px;
  padding: 10px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease-in;
  &:focus {
    outline: none;
  }
`;
const SearchBtn = styled.button`
  background: transparent;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Home = () => {
  const location = useLocation();
  const getJWT = new URLSearchParams(location.search);
  // console.log(getJWT.get("jwt"));

  useEffect(() => {
    const JWT = JSON.parse(getJWT.get("jwt"));
    // console.log(JWT);
    if (JWT != null) {
      localStorage.setItem("accessToken", JWT.accessToken);
      localStorage.setItem("tokenExpiresIn", JWT.tokenExpiresIn);
    }

    // console.log(localStorage.getItem("accessToken"));
  }, [getJWT]);

  return (
    <>
      <Header background="transparent" />
      <Banner />
      <VideoContainer>
        <Video
          muted
          autoPlay
          loop
          src="/static/media/BackgroundVideo4.mp4"
          type="video/mp4"
        ></Video>
        <span className="whatFestival">need search?</span>
        <SearchBoxContainer className="sbcontainer">
          <SearchBox type="text" className="sb" />
          <SearchBtn>
            <SearchIcon
              style={{ color: "white", fontSize: "32px" }}
              className="finder"
            />
          </SearchBtn>
        </SearchBoxContainer>
      </VideoContainer>
      <BodyContainer></BodyContainer>
    </>
  );
};
export default Home;
