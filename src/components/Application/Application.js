import React from "react";

import "./Application.scss";
import DayList from "../DayList/DayList";
import Appointment from "../Appointments/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../../hooks/useApplicationData";

const Application = () => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewers = getInterviewersForDay(state, state.day);
  const appts = getAppointmentsForDay(state, state.day);

  let schedules = appts.map(appointment => {
    const interviewInfo = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={
          appointment.id === appointment.id
        }
        id={appointment.id}
        time={appointment.time}
        interview={interviewInfo}
        interviewers={interviewers}
        bookInterview={bookInterview}
        onCancel={cancelInterview}
      />
    );
  });

  schedules = [...schedules, <Appointment key="last" time="5pm" />];

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          width="98%"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedules}
      </section>
    </main>
  );
}

export default Application;