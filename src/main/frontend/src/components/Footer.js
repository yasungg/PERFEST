import styled from "styled-components";
import Logo from "../images/PERFEST LOGO BLACK.png";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
const FooterContainer = styled.div`
  display: grid;
  width: 90%;
  height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left mid right";
  border-top: 1px solid gray;
  margin: 0 auto;
  @media screen and (max-width: 735px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "left"
      "right"
      "mid";
  }
  #box1 {
    grid-area: left;
  }
  #box2 {
    grid-area: mid;
    height: 300px;
    margin-left: 20px;
  }
  #box3 {
    grid-area: right;
  }
`;
const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const FooterLogo = styled.img`
  width: 200px;
  height: 10vh;
  user-select: none;
`;
const MidFooterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  margin: auto 0;
  flex-direction: column;
  justify-content: space-between;
  .contactDiv {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .addressDiv {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .copyrightDiv {
    display: flex;
    align-items: center;
  }
`;
const MidSpan = styled.a`
  font-size: ${(props) => props.fontSize};
  font-weight: 800;
  user-select: none;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;
const RightFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0 0 16px;
`;
const SNSBtns = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
`;
const SNSbtn = styled.button`
  display: flex;
  width: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: white;
  &:hover {
    cursor: pointer;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox id="box1">
        <FooterLogo src={Logo} alt="" />
      </FooterBox>
      <FooterBox id="box2">
        <MidFooterContainer>
          <span style={{ fontSize: "1.2em", fontWeight: "800" }}>
            CONTACT US
          </span>
          <div className="contactDiv">
            <MidSpan href="/" fontSize=".8em">
              TEL / 02-000-0000
            </MidSpan>
            <MidSpan href="/" fontSize=".8em">
              EMAIL / administrator@perfest.com
            </MidSpan>
            <MidSpan href="/" fontSize=".8em">
              FAX / 02-111-1111
            </MidSpan>
          </div>
          <div className="addressDiv">
            <MidSpan
              href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%2014%EA%B8%B8%206/address/14141234.30222055,4508891.836560594,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C14%EA%B8%B8%206,new?c=16.79,0,0,0,dh&isCorrectAnswer=true"
              fontSize=".9em"
            >
              서울특별시 강남구 테헤란로 14길 6
            </MidSpan>
            <div className="copyrightDiv">
              <CopyrightIcon style={{ fontSize: "0.9em" }} />
              <MidSpan href="/" fontSize=".8em">
                PERFEST Co., Ltd.
              </MidSpan>
            </div>
          </div>
        </MidFooterContainer>
      </FooterBox>
      <FooterBox id="box3">
        <RightFooterContainer>
          <span
            style={{
              margin: "0 0 8px 8px",
              fontSize: ".7em",
              fontWeight: "800",
              userSelect: "none",
            }}
          >
            SNS
          </span>
          <SNSBtns>
            <SNSbtn>
              <FacebookIcon style={{ fontSize: "32px" }} />
            </SNSbtn>
            <SNSbtn>
              <InstagramIcon style={{ fontSize: "32px" }} />
            </SNSbtn>
            <SNSbtn>
              <YouTubeIcon style={{ fontSize: "32px" }} />
            </SNSbtn>
            <SNSbtn>
              <LinkedInIcon style={{ fontSize: "32px" }} />
            </SNSbtn>
            <SNSbtn>
              <TwitterIcon style={{ fontSize: "32px" }} />
            </SNSbtn>
          </SNSBtns>
        </RightFooterContainer>
      </FooterBox>
    </FooterContainer>
  );
};
export default Footer;
