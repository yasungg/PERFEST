import styled from "styled-components";
import Logo from "../images/PERFEST LOGO BLACK.png";
const FooterContainer = styled.div`
  display: grid;
  width: 90%;
  height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left mid right";
  border-top: 1px solid gray;
  margin: 0 auto;
`;
const FooterBox = styled.div`
  display: flex;
  height: 100%;
  .box1 {
    grid-area: left;
    background: red;
  }
  .box2 {
    grid-area: mid;
    background: black;
  }
  .box3 {
    grid-area: right;
    background: royalblue;
  }
`;
const FooterLogo = styled.img`
  width: 50%;
  height: 10vh;
`;
const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox className="box1">
        <FooterLogo src={Logo} alt="" />
      </FooterBox>
      <FooterBox className="box2">aa</FooterBox>
      <FooterBox className="box3">aa</FooterBox>
    </FooterContainer>
  );
};
export default Footer;
