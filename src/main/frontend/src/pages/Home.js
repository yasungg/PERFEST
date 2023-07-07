import { Container, BodyContainer } from "../components/StandardStyles";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router";

const Home = () => {
  const location = useLocation();
  const getJWT = new URLSearchParams(location.search);
  console.log(getJWT.get("jwt"));

  useEffect(() => {
    const JWT = JSON.parse(getJWT.get("jwt"));
    console.log(JWT);
    localStorage.setItem("accessToken", JWT.accessToken);
    localStorage.setItem("tokenExpiresIn", JWT.tokenExpiresIn);

    console.log(localStorage.getItem("accessToken"));
  }, [getJWT]);

  return (
    <Container alignItems="center">
      <Header />
      <BodyContainer>aa</BodyContainer>
    </Container>
  );
};
export default Home;
