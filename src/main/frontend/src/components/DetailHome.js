import { Container } from "./StandardStyles";
import styled from "@emotion/styled";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import { formatDateForFestival } from "./DateStyle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DirectionsIcon from "@mui/icons-material/Directions";
import AttractionsIcon from "@mui/icons-material/Attractions";
import BusinessIcon from "@mui/icons-material/Business";
import FestivalAPI from "../api/FestivalAPI";
import MemberAPI from "../api/MemberAPI";
import Modal from "../utils/Modal";

const AdvertisementBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 48px;
  background: #f1f1f1;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  span {
    font-size: 14px;
  }
  .bold {
    font-weight: 600;
  }
  @media screen and (max-width: 376px) {
    span {
      font-size: 13px;
    }
  }
`;
const MiniButton = styled.button`
  display: flex;
  width: 60px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  .bold {
    font-weight: 600;
    color: royalblue;
  }
  .icon-change {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    .add-icon {
      position: absolute;
      left: -20px;
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .icon-change {
    .calendar-icon {
      transition: all 0.1s linear;
      transform: translateX(20px);
    }
    .add-icon {
      transition: all 0.1s linear;
      left: 0;
    }
  }
  @media screen and (max-width: 376px) {
    .bold {
      font-size: 13px;
    }
  }
`;
const InfoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  border: none;
`;
const InfoBox = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;
const InfoIconBox = styled.div`
  display: inline-block;
  width: 40px;
  height: 100%;
  float: left;
`;
const InfoDescBox = styled.div`
  display: inline-block;
  width: calc(100% - 72px);
  height: auto;
  .direction-button {
    color: #222;
    font-size: 18px;
    transform: translateY(3px);
    margin-left: 4px;
    transition: all 0.1s ease-in;
    &:hover {
      color: royalblue;
    }
  }
  p {
    font-size: 15px;
    transform: translateY(3px);
  }
`;
const DetailHome = () => {
  const { setCenterLatitude, setCenterLongitude, detailComponentValue } =
    useContext(UserContext);
  const [festivalDetail, setFestivalDetail] = useState([]);

  const [showModal, setShowModal] = useState(false);



  const handleAddToCalendar = async () => {
    if (detailComponentValue) {
      const festivalId = detailComponentValue; // detailComponentValue가 캘린더 ID
      try {
        const response = await MemberAPI.addCal(festivalId);
        if (response.data) {
          // console.log("캘린더에 추가되었습니다!");
          setShowModal(true);
        } else {
          // console.log("추가 중 오류가 발생했습니다.");
        }
      } catch (error) {
        // console.error("추가 중 오류가 발생했습니다.", error);
      }
    } else {
      // console.log("추가할 축제 정보가 없습니다...");
    }
  };

  //카드를 클릭하면 해당 마커의 위치로 지도 위치를 이동시키기 위한 context 설정
  const setCenterMarker = (latitude, longitude) => {
    setCenterLatitude(latitude);
    setCenterLongitude(longitude);
    console.log(latitude);
    console.log(longitude);
  };

  useEffect(() => {
    //상세정보 불러오기
    const getFestivalDetail = async () => {
      const response = await FestivalAPI.getFestivalByFestivalId(
        detailComponentValue // festivalId
      )
        .then((result) => {
          setFestivalDetail(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    detailComponentValue && getFestivalDetail();
  }, [detailComponentValue]);
  return (
    <Container>
      <AdvertisementBox>
        <div className="spanbox">
          <span className="bold">캘린더</span>
          <span>를 활용해 편리하게 축제일정을 관리하세요!</span>
        </div>
        <MiniButton
          className="advertisement-button"
          onClick={handleAddToCalendar}
        >
          <div className="icon-change">
            <CalendarMonthIcon
              className="calendar-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
            <AddIcon
              className="add-icon"
              style={{ color: "royalblue", fontSize: "20px" }}
            />
          </div>
          <span className="bold">캘린더</span>
        </MiniButton>
      </AdvertisementBox>
      {festivalDetail.map((data, index) => (
        <InfoBoxContainer key={index}>
          <InfoBox>
            <InfoIconBox>
              <PlaceIcon style={{ color: "royalblue" }} />
            </InfoIconBox>
            <InfoDescBox>
              <span style={{ fontSize: "15px" }}>{data.festivalDoro}</span>
              {data.festivalDoro && (
                <DirectionsIcon
                  className="direction-button"
                  onClick={() => setCenterMarker(data.wedo, data.kyungdo)}
                />
              )}
            </InfoDescBox>
          </InfoBox>
          <InfoBox>
            <InfoIconBox>
              <PlaceIcon style={{ color: "royalblue" }} />
            </InfoIconBox>
            <InfoDescBox>
              <span style={{ fontSize: "15px" }}>{data.festivalLocation}</span>
              {data.festivalLocation && (
                <DirectionsIcon
                  className="direction-button"
                  onClick={() => setCenterMarker(data.wedo, data.kyungdo)}
                />
              )}
            </InfoDescBox>
          </InfoBox>
          <InfoBox>
            <InfoIconBox>
              <LocalPhoneIcon style={{ color: "royalblue" }} />
            </InfoIconBox>
            <InfoDescBox>
              <p>{data.festivalTel}</p>
            </InfoDescBox>
          </InfoBox>
          <InfoBox>
            <InfoIconBox>
              <AttractionsIcon style={{ color: "royalblue" }} />
            </InfoIconBox>
            <InfoDescBox>
              <p style={{ fontSize: "14px" }}>
                시작일 : {formatDateForFestival(data.startDate)}
              </p>
              <p style={{ fontSize: "14px" }}>
                종료일 : {formatDateForFestival(data.endDate)}
              </p>
            </InfoDescBox>
          </InfoBox>
          <InfoBox>
            <InfoIconBox>
              <BusinessIcon style={{ color: "royalblue" }} />
            </InfoIconBox>
            <InfoDescBox>
              <span style={{ fontSize: "15px" }}>{data.mainOrg}</span>
            </InfoDescBox>
          </InfoBox>
        </InfoBoxContainer>
      ))}
        <Modal open={showModal} close={() => setShowModal(false)} confirm={() => {}}>
           캘린더에 추가되었습니다!
        </Modal>
    </Container>
  );
};
export default DetailHome;
