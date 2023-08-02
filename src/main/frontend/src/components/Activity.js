import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "@emotion/styled";
import { Container } from "./StandardStyles";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FestivalAPI from "../api/FestivalAPI";

const ActivityBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: column;
  padding: 16px;
  border: none;
  border-bottom: 0.7px solid #f1f1f1;
  background: white;
  .activity-desc {
    font-size: 12px;
    color: #999;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ActivitySpanBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
  border: none;
  background: transparent;
  margin-bottom: 4px;
  .activity-title {
    font-weight: 600;
  }
  .activity-price {
    font-size: 13px;
  }
  .activity-sold-out {
    color: red;
    font-size: 14px;
    font-weight: 500;
  }
`;
const Activity = () => {
  const [activity, setActivity] = useState([]);
  const { detailComponentValue } = useContext(UserContext);

  useEffect(() => {
    const getList = async () => {
      const activity = await FestivalAPI.GetActivityListForDetail(
        detailComponentValue
      )
        .then((result) => {
          setActivity(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (detailComponentValue) getList();
  }, [detailComponentValue]);
  return (
    <Container>
      {activity &&
        activity.map((data, index) => (
          <ActivityBox
            onClick={() => console.log("activity box open!!")}
            key={index}
          >
            <ActivitySpanBox>
              <span className="activity-title">{data.activityName}</span>
              {data.activityQuantity !== 0 ? (
                <span className="activity-price">{data.activityPrice} 원</span>
              ) : (
                <span className="activity-sold-out">마감</span>
              )}
            </ActivitySpanBox>
            <span className="activity-desc">{data.activityDesc}</span>
          </ActivityBox>
        ))}
    </Container>
  );
};
export default Activity;
