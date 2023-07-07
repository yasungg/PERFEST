import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import FirstSlider from "./FirstSlider";
import SecondSlider from "./SecondSlider";
import React from "react";

const SliderContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Banner = () => {
  const settings = {
    rows: 1,
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnDotsHover: true,
  };
  return (
    <SliderContainer>
      <Slider {...settings}>
        <div>
          <FirstSlider />
        </div>
        <div>
          <SecondSlider />
        </div>
      </Slider>
    </SliderContainer>
  );
};
