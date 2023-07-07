import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../CalendarStyle.css';

const Calendar = () => {
  const events = [
    { title: 'Meeting1', start: new Date('2023-7-05') },
    { title: 'Meeting2', start: new Date('2023-7-30') }
  ];

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
 