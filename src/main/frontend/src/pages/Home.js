import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Banner } from "../components/Banner";
import Picture from "../images/newimage.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Sidebar from "../components/Sidebar";
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media screen and (max-width: 853px) {
    width: 100vw;
    height: 100%;
    overflow-y: visible;
  }
`;
const VideoContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  border: none;
  &:hover .sbcontainer {
    opacity: 1;
    width: 768px;
  }
  @media screen and (max-width: 1025px) {
    &:hover .sbcontainer {
      opacity: 1;
      width: 400px;
    }
  }
  @media screen and (max-width: 769px) {
    &:hover .sbcontainer {
      opacity: 1;
      width: 320px;
    }
  }
  @media screen and (max-width: 320px) {
    &:hover .sbcontainer {
      opacity: 1;
      width: 240px;
    }
  }
  @media screen and (min-width: 1441px) {
    width: auto;
    height: auto;
  }
`;
const Video = styled.video`
  width: 100%;
  background-size: cover;
  min-height: 100vh;
  border: none;
  outline: none;
  z-index: 0;
  @media screen and (min-width: 1441px) {
    width: 100vw;
    height: 100vh;
  }
  @media screen and (max-width: 1440px) {
    width: auto;
  }
`;
const TMPbox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .whatFestival {
    font-size: calc(16px + 2vw);
    color: white;
    margin-bottom: 8px;
    user-select: none;
    transition: all 0.7s linear;
  }
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
  transition: all 0.7s ease-out;
  opacity: 0;
  &:focus {
    opacity: 1;
    width: 768px;
  }
  @media screen and (max-width: 1025px) {
    &:focus {
      opacity: 1;
      width: 400px;
    }
  }
  @media screen and (max-width: 769px) {
    &:focus {
      opacity: 1;
      width: 320px;
    }
  }
  @media screen and (max-width: 320px) {
    &:focus {
      opacity: 1;
      width: 240px;
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: transparent;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const ItemBox = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: "box1 box2";
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 853px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas:
      "box2"
      "box1";
    height: 100vh;
  }
`;
const ItemBoxForPic = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 1024px;
  overflow: hidden;
  @media screen and (max-width: 853px) {
    height: 600px;
    min-height: 600px;
  }
`;
const PictureForItemBox = styled.img`
  width: 40vw;
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-110%, -50%);
  transition: all 0.2s linear;
  overflow: hidden;
  @media screen and (max-width: 853px) {
    width: 60vw;
    transform: translate(-30%, -50%);
    opacity: 0.5;
    border-radius: 20px;
  }
`;
const GridBox1 = styled.div`
  grid-area: box1;
  position: relative;
`;
const GridBox2 = styled.div`
  grid-area: box2;
  position: relative;
  background: transparent;
`;
const DescBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 30vh;
  background: transparent;
  z-index: 1;
  @media screen and (max-width: 853px) {
    width: 90vw;
    height: 40vh;
    min-height: 200px;
  }
  .div1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
  }
  .desc1 {
    font-size: calc(16px + 1.5vw);
    font-weight: 500;
    user-select: none;
    @media screen and (max-width: 853px) {
      font-size: calc(16px + 2vw);
      font-weight: 800;
    }
  }
  .desc2 {
    user-select: none;
    @media screen and (max-width: 853px) {
      font-size: calc(16px + 1vw);
    }
  }
`;
const DescBoxForPicture = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(20%, -50%);
  width: 40vw;
  height: 30vh;
  background: transparent;
  z-index: 1;
  @media screen and (max-width: 853px) {
    width: 90vw;
    height: 40vh;
    min-height: 200px;
    transform: translate(-50%, -50%);
  }
  .div1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
  }
  .desc1 {
    font-size: calc(16px + 1.5vw);
    font-weight: 500;
    user-select: none;
    @media screen and (max-width: 853px) {
      font-size: calc(16px + 2vw);
      font-weight: 800;
    }
  }
  .desc2 {
    user-select: none;
    @media screen and (max-width: 853px) {
      font-size: calc(16px + 0.5vw);
    }
  }
`;
const ResponsiveBtnBox = styled.div`
  position: relative;
  width: 24vw;
  height: 6vh;
  overflow-x: hidden;
  .cover-btn {
    position: absolute;
    top: 0;
    left: -24vw;
    transition: all 0.3s ease-in-out;
  }
  &:hover .cover-btn {
    left: 0;
  }
  @media screen and (max-width: 853px) {
    width: 300px;
    .cover-btn {
      left: -300px;
    }
  }
`;
const DescButtons = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.background};
  border: 1px solid black;
  width: 24vw;
  height: 6vh;
  padding: 16px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 853px) {
    width: 300px;
  }
`;
const VideoForItemBox1 = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36vw;
  border: none;
  border-radius: 20px;
  outline: none;
  z-index: 0;
  overflow: hidden;
  @media screen and (max-width: 853px) {
    width: 70vw;
  }
`;
const UpBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 72px;
  right: 72px;
  background: transparent;
  border: 2px solid black;
  border-radius: 50%;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 32px;
    height: 32px;
    bottom: 32px;
    right: 32px;
  }
`;
const SidebarContainer = styled.div`
  display: flex;
  position: fixed;
  width: calc(300px + 1vw);
  height: 100vh;
  top: 0;
  right: -5px;
  background: black;
  border: none;
  border-radius: 5px;
  z-index: 100;
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;
const Home = () => {
  const location = useLocation();
  const getJWT = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const scrollTo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const JWT = JSON.parse(getJWT.get("jwt"));
    if (JWT != null) {
      localStorage.setItem("accessToken", JWT.accessToken);
      localStorage.setItem("tokenExpiresIn", JWT.tokenExpiresIn);
      console.log(localStorage.getItem("accessToken"));
    }
  }, [getJWT]);
  return (
    <Container>
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
        <TMPbox>
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
        </TMPbox>
      </VideoContainer>
      <ItemBoxForPic>
        <DescBoxForPicture>
          <div className="div1">
            <span className="desc1">축제의 모든 것들을 한 눈에</span>
          </div>
          <div className="div1">
            <span className="desc2">
              축제 날짜부터 위치, 구성 프로그램과 특산물까지
            </span>
            <span className="desc2">모든 정보들에 간편하게 접근하세요.</span>
          </div>
          <ResponsiveBtnBox>
            <DescButtons
              className="cover-btn"
              background="#222"
              onClick={() => navigate("/pages/festival")}
            >
              <span style={{ color: "white" }}>need more information?</span>
              <NavigateNextIcon style={{ color: "white" }} />
            </DescButtons>
            <DescButtons
              background="white"
              onClick={() => navigate("/pages/festival")}
            >
              <span>need more information?</span>
              <NavigateNextIcon />
            </DescButtons>
          </ResponsiveBtnBox>
        </DescBoxForPicture>
        <PictureForItemBox src={Picture} />
      </ItemBoxForPic>
      <ItemBox>
        <GridBox1 id="box1">
          <DescBox>
            <div className="div1">
              <span className="desc1">축제가 끝나도</span>
              <span className="desc1">끝나지 않는 즐거움</span>
            </div>
            <div className="div1">
              <span className="desc2">
                축제 활동 내용을 기반으로 한 랭킹 시스템,
              </span>
              <span className="desc2">
                활성화된 커뮤니티에서 색다른 재미를 찾아보세요!
              </span>
            </div>
            <ResponsiveBtnBox>
              <DescButtons
                className="cover-btn"
                background="#222"
                onClick={() => navigate("/pages/board")}
              >
                <span style={{ color: "white" }}>need more information?</span>
                <NavigateNextIcon style={{ color: "white" }} />
              </DescButtons>
              <DescButtons
                background="white"
                onClick={() => navigate("/pages/board")}
              >
                <span>need more information?</span>
                <NavigateNextIcon />
              </DescButtons>
            </ResponsiveBtnBox>
          </DescBox>
        </GridBox1>
        <GridBox2 id="box2">
          <VideoForItemBox1
            muted
            autoPlay
            loop
            src="/static/media/Ranking.mp4"
            type="video/mp4"
          ></VideoForItemBox1>
        </GridBox2>
      </ItemBox>
      <UpBtn onClick={scrollTo}>
        <ArrowUpwardIcon />
      </UpBtn>
      <Sidebar />
      <Footer />
    </Container>
  );
};
export default Home;
