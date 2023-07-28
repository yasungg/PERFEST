import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import { Xbox, Xbtn } from "../components/StandardStyles";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FestivalAPI from "../api/FestivalAPI";
import BlackLogo from "../images/PERFEST LOGO BLACK.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Review from "./Review";
import DetailHome from "../components/DetailHome";
const DetailContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: ${(props) => props.left};
  width: 400px;
  height: calc(100vh - 58px);
  background: #222;
  z-index: 2;
  box-shadow: 1px 0px 5px 0px #555555;
  transition: all 0.3s ease-in;
  overflow-x: hidden;
  @media screen and (max-width: 767px) {
    position: absolute;
    width: 100vw;
    max-width: 100vw;
    left: 0;
    height: calc(100vh - 44px - 40vh);
    top: ${(props) => props.top};
    /* bottom: ${(props) => props.bottom}; */
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  @media screen and (max-width: 376px) {
    height: calc(100vh - 6vh);
    z-index: 99;
  }
`;
const FestDetailPictureBox = styled.div`
  width: 400px;
  height: 200px;
  background: white;
  display: flex;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const FestDetailMainPicture = styled.div`
  width: 50%;
  max-width: 50%;
  height: 200px;
  @media screen and (max-width: 1024px) {
    width: 100vw;
  }
`;
const FestDetailSubPictureBox = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100px 100px;
  grid-template-areas:
    "picture-1 picture-3"
    "picture-2 picture-4";
  overflow: hidden;
  width: 200px;
  height: 200px;
  /* .main-picture {
    grid-area: main-picture;
  } */
  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows:
      100px
      100px;
    grid-template-areas:
      "picture-1 picture-3"
      "picture-2 picture-4";
    width: 100%;
    height: 200px;
    min-height: 200px;
  }
  .picture-2 {
    grid-area: picture-2;
  }
  .picture-3 {
    grid-area: picture-3;
  }
  .picture-4 {
    grid-area: picture-4;
  }
  .picgture-5 {
    grid-area: picture-5;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: calc(100% / 2);
  }
`;
const FestDetailPictureDiv = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;
const FestPicture = styled.img`
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const DimmedBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 34, 34, 0.3);
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: rgba(34, 34, 34, 0.7);
    cursor: pointer;
  }
`;
const DetailBodyContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */

  &::-webkit-scrollbar {
    position: fixed;
    right: -4px;
    width: 6px;
    background: white;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: rgba(34, 34, 34, 0.7);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0px 0px 3px gray; */
  }
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
`;
const FestivalNameBox = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;

  .festival-like {
    display: flex;
    align-items: center;
    position: absolute;
    top: 70%;
    left: 40%;
    transform: translate(-50%, -20%);
    font-size: 12px;
  }
  .festival-tel {
    display: flex;
    align-items: center;
    position: absolute;
    top: 70%;
    left: 60%;
    transform: translate(-50%, -20%);
    font-size: 12px;
  }
`;
const NameDesc = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .festival-title {
    width: auto;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .festival-desc {
    width: auto;
    font-size: 12px;
  }
`;
const FestivalNaviBox = styled.ul`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  background: white;
  .festival-navi-radio {
    display: none;
  }
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
`;
const FestivalNaviBtn = styled.li`
  width: 25%;
  height: 100%;
  background: white;
  list-style-type: none;
  .festival-navi-radio:checked + .navi-label {
    span {
      border-bottom: 2px solid #222;
    }
  }
`;
const FestivalDetailLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  user-select: none;
  span {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &:hover span {
    transform: translateY(-2px);
    transition: all 0.2s linear;
  }
`;
const DetailDescBox = styled.div`
  width: 100%;
  background: white;
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
`;
const FestivalDetail = () => {
  const {
    festDetailBoxMove,
    setFestDetailBoxMove,
    festDetailBoxMoveY,
    setFestDetailBoxMoveY,
    detailComponentValue,
  } = useContext(UserContext);

  const [navigationValue, setNavigationValue] = useState("");
  const [festivalNameBox, setFestivalNameBox] = useState({});
  //max-width가 바뀜에 따라 true/false 반환
  const [mQuery, setMQuery] = useState(window.innerWidth < 769 ? true : false);

  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width:769px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  useEffect(() => {
    //namebox 정보 불러오기
    const getFestivalNameBox = async () => {
      const nameboxResponse = await FestivalAPI.GetNameBoxInfo(
        detailComponentValue
      )
        .then((result) => {
          console.log(result.data);
          setFestivalNameBox(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (detailComponentValue) {
      getFestivalNameBox();
    }
  }, [detailComponentValue]);
  useEffect(() => {
    console.log(navigationValue);
  }, [navigationValue]);
  return (
    <DetailContainer left={festDetailBoxMove} top={festDetailBoxMoveY}>
      <Xbox>
        <DashboardIcon
          style={{ color: "white", marginLeft: "8px", fontSize: "28px" }}
        />
        {mQuery ? (
          <Xbtn onClick={() => setFestDetailBoxMoveY("-100vh")}>
            <KeyboardArrowDownIcon
              className="xIcon"
              style={{ color: "white" }}
            />
          </Xbtn>
        ) : (
          <Xbtn onClick={() => setFestDetailBoxMove("-80px")}>
            <CloseIcon className="xIcon" style={{ color: "white" }} />
          </Xbtn>
        )}
      </Xbox>
      <DetailBodyContainer>
        <FestDetailPictureBox>
          <FestDetailMainPicture>
            <FestPicture src={BlackLogo} />
          </FestDetailMainPicture>
          <FestDetailSubPictureBox>
            <FestDetailPictureDiv
              className="picture-1"
              src={BlackLogo}
              alt="aa"
            >
              <FestPicture src={BlackLogo} />
            </FestDetailPictureDiv>
            <FestDetailPictureDiv
              className="picture-2"
              src={BlackLogo}
              alt="aa"
            >
              <FestPicture src={BlackLogo} />
            </FestDetailPictureDiv>
            <FestDetailPictureDiv
              className="picture-3"
              src={BlackLogo}
              alt="aa"
            >
              <FestPicture src={BlackLogo} />
            </FestDetailPictureDiv>
            <FestDetailPictureDiv
              className="picture-4"
              src={BlackLogo}
              alt="aa"
            >
              <FestPicture src={BlackLogo} />
              <DimmedBackground>
                <AddCircleOutlineIcon
                  style={{ color: "white", fontSize: "36px" }}
                />
              </DimmedBackground>
            </FestDetailPictureDiv>
          </FestDetailSubPictureBox>
        </FestDetailPictureBox>

        <FestivalNameBox>
          <NameDesc>
            <span className="festival-title">
              {festivalNameBox.festivalName}
            </span>
            <span className="festival-desc">
              {festivalNameBox.festivalDesc}
            </span>
          </NameDesc>
          <div className="festival-like">
            <FavoriteIcon
              style={{ color: "red", fontSize: "12px", marginRight: "4px" }}
            />
            <span style={{ fontSize: "12px" }}>
              {festivalNameBox.likeCount}
            </span>
          </div>
          <div className="festival-tel">
            <ForumIcon
              style={{
                color: "#222",
                fontSize: "12px",
                marginRight: "4px",
              }}
            />
            <span style={{ fontSize: "12px" }}>
              {festivalNameBox.reviewCount}
            </span>
          </div>
        </FestivalNameBox>
        <FestivalNaviBox>
          <FestivalNaviBtn>
            <input
              type="radio"
              className="festival-navi-radio"
              id="detail-navi-home"
              name="detail-navi-group"
              value="home"
              defaultChecked="true"
              onChange={(e) => setNavigationValue(e.target.value)}
            />
            <FestivalDetailLabel className="navi-label" for="detail-navi-home">
              <span>홈</span>
            </FestivalDetailLabel>
          </FestivalNaviBtn>
          <FestivalNaviBtn>
            <input
              type="radio"
              className="festival-navi-radio"
              id="detail-navi-program"
              name="detail-navi-group"
              value="program"
              onChange={(e) => setNavigationValue(e.target.value)}
            />
            <FestivalDetailLabel
              className="navi-label"
              for="detail-navi-program"
            >
              <span>프로그램</span>
            </FestivalDetailLabel>
          </FestivalNaviBtn>
          <FestivalNaviBtn>
            <input
              type="radio"
              className="festival-navi-radio"
              id="detail-navi-product"
              name="detail-navi-group"
              value="product"
              onChange={(e) => setNavigationValue(e.target.value)}
            />
            <FestivalDetailLabel
              className="navi-label"
              for="detail-navi-product"
            >
              <span>상품</span>
            </FestivalDetailLabel>
          </FestivalNaviBtn>
          <FestivalNaviBtn>
            <input
              type="radio"
              className="festival-navi-radio"
              id="detail-navi-review"
              name="detail-navi-group"
              value="review"
              onChange={(e) => setNavigationValue(e.target.value)}
            />
            <FestivalDetailLabel
              className="navi-label"
              for="detail-navi-review"
            >
              <span>리뷰</span>
            </FestivalDetailLabel>
          </FestivalNaviBtn>
        </FestivalNaviBox>
        <DetailDescBox>
          {navigationValue === "home" && <DetailHome />}
          {navigationValue === "review" && <Review />}

          {!navigationValue && <DetailHome />}
        </DetailDescBox>
      </DetailBodyContainer>
    </DetailContainer>
  );
};
export default FestivalDetail;
