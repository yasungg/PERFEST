import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import { Container } from "./StandardStyles";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FestivalAPI from "../api/FestivalAPI";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const { detailComponentValue } = useContext(UserContext);
  return <Container>aa</Container>;
};
export default Activity;
