import React, { useEffect, useState } from "react";
import { TRAINING_URL } from "../constants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(TRAINING_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong while fetching survey!");
        }
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((err) => console.error(err));
  };

  const showEvent = (eventInfo) => {
    return (
      <>
        <p>
          <b>
            {eventInfo.timeText} <br />
          </b>
          {eventInfo.event._def.extendedProps.customer.firstname}{" "}
          {eventInfo.event._def.extendedProps.customer.lastname}
          {" - "}
          {eventInfo.event._def.extendedProps.activity}
        </p>
      </>
    );
  };

  return (
    <>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          firstDay={1}
          headerToolbar={{
            right: "prev,next today",
            center: "title",
            left: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={trainings}
          eventContent={showEvent}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
          }}
        />
      </div>
    </>
  );
}

export default CalendarPage;
