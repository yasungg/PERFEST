import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import "../CustomInfoWindowCSS.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CustomInfoWindow = ({ title, likeCount }) => {
  return (
    <div className="custominfo-container">
      <div className="custominfo-inner">
        <li className="title">
          <span>{title}</span>
        </li>
        <li className="likeCount">
          <FavoriteIcon
            style={{ color: "red", fontSize: "12px", marginRight: "4px" }}
          />
          <span>{likeCount}</span>
        </li>
      </div>
    </div>
  );
};
export default CustomInfoWindow;
