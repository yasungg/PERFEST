import React from "react";
import "../MarkerOverLappingCSS.css"

const MarkerOverLapping = () => {
  return (
    <div className="markerOverLappingContainer">
      <div className="markerOverLappingInner">
        <div className="overLappingTitle">
          <p className="title">더 스프링 시즌 A.D.H.D. 페스티벌</p>
        </div>
        <div className="overLappingTitle">
          <p className="title">6월 마토예술제</p>
        </div>
        <div className="overLappingTitle">
          <p className="title">더 어텀 시즌 아트&플레이 페스타</p>
        </div>
      </div>
    </div>
  );
};
export default MarkerOverLapping