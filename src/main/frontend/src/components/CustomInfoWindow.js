import React from "react";
import "../CustomInfoWindowCSS.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CustomInfoWindow = ({title, likeCount}) => {
  return(
      <div className="custominfo-container">
        <div className="custominfo-inner">
          <li className="title">{title}</li>
          <li className="likeCount">
            <FavoriteIcon
              style={{ color: "red", fontSize: "12px", marginRight: "4px" }}
            />
            <p>9999</p>
          </li>
        </div>
      </div>
  );
};
export default CustomInfoWindow;