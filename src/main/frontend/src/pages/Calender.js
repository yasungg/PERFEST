import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../CalendarStyle.css";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import Modal from "../utils/Modal";
import { Container } from "../components/StandardStyles";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// const CalendarContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: red;
//   height: 100vh;
// `;
// const CalendarStyle = styled.div`
//   display: flex;
//   justify-content: center;
//   background-color: blue;
//   height: 700px;
//   width: 1500px;
// `;

const StyledFullCalendar = styled(FullCalendar)`
  .fc-dayGridMonth-view {
    background-color: #f2f2f2;
    border: 1px solid #ccc;
  }

  .fc-day-today {
    background-color: #ffc107;
  }

  .fc-event {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px;
    margin-bottom: 5px;
  }
  .calendar {
    width: 1200px;
  }
`;

const Calendar = () => {
  const [memberCal, setMemberCal] = useState([]);
  const [delModalOpen, setDelModalOpen] = useState(false);

  useEffect(() => {
    const likeFestival = async () => {
      const rsp = await MemberAPI.getCalendar();
      if (rsp.status === 200) setMemberCal(rsp.data);
    };
    likeFestival();
  }, []);

  const delCalender = () => {
    setDelModalOpen(true);
  };

  const closeModal = () => {
    setDelModalOpen(false);
  };


  const predefinedColors = [
    "#fa5252",
    "#fd7e14",
    "fcc419",
    "#40c057",
    "#339af0",
    "#7950f2",
  ];

  const getPredefinedColor = (color) => {
    return predefinedColors[color % predefinedColors.length];
  };

  return (
    <Container>
      <Header />
      <StyledFullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={memberCal && memberCal.map((calEvent, index) => ({
          title: calEvent.festivalName,
          start: calEvent.startDate,
          end: calEvent.endDate,
          backgroundColor: getPredefinedColor(index),
        }))}
      />
      <Sidebar />
    </Container>
  );
};

export default Calendar;
