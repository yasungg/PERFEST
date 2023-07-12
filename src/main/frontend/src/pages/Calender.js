import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../CalendarStyle.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: red;
`;
const CalendarStyle = styled.div`
display: flex;
background-color: blue;
justify-content: center;
width: 1000px;
height: 600px;
`;

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
    width: 600px;
  }
  .fc-day {
    width: 100px;
    height: 50px;
  }
`;

const Calendar = () => {
    return (
        <CalendarContainer>
            <CalendarStyle>
                <StyledFullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[
                        { title: '정민이 바보', start: '2023-07-11', end: '2023-07-17', backgroundColor: 'red' },
                        { title: 'event 2', date: '2022-09-02' }
                    ]}
                />
            </CalendarStyle>
        </CalendarContainer>
    );
}

export default Calendar;