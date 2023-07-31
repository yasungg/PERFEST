import React from "react";
import styled from "@emotion/styled";
import "../CustomInfoWindowCSS.css";

const CustomInfoWindow = (title, desc, tel) => {
  return(
      <div className="custominfo-container">
        <div className="custominfo-inner">
          <p className="title">title</p>
          <p className="desc">desc</p>
          <p className="tel">tel</p>
        </div>
      </div>
  );
};
export default CustomInfoWindow;