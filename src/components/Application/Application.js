import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Application.scss";
import DayList from "../DayList/DayList";
import Appointment from "../Appointments/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  const appts = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update appointments with the new appointment
    axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(setState({...state, appointments}))
      .catch(err => console.error(err));    
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log('id: ', id);
    console.log('appointment:', appointment);
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    };
    // console.log('appointments:', appointments);

    // update appointments with appointment with interview set to null
    axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(setState({ ...state, appointments }))
      .catch(err => console.error(err));    
  };

  const editInterview = (id, interview) => {
    bookInterview(id, interview);
  };

  const schedules = appts.map((appointment) => {
    const interviewInfo = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id === appointment.length + 1 ? "last" : appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interviewInfo}
        interviewers={interviewers}
        bookInterview={bookInterview}
        onCancel={cancelInterview}
      />
    );
  }
  );

  // getting day, appointments, interview data from /api/ and then setting state
  useEffect(() => {
    Promise
      .all([
        Promise.resolve(axios.get('/api/days')),
        Promise.resolve(axios.get('/api/appointments')),
        Promise.resolve(axios.get('/api/interviewers'))
      ])
      .then((all) => {
        setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
      .catch(err => console.error(err));
  }, []);

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
