import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import "../CustomInfoWindowCSS.css";

const CustomInfoWindow = ({ title, likeCount }) => {
  return (
    <div className="custominfo-container">
      <div className="custominfo-inner">
        <p className="title">{title}</p>
        <p className="likeCount">{likeCount}</p>
      </div>
    </div>
  );
};
export default CustomInfoWindow;
