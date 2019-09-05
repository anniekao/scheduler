import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: [],
  //   interviewers: {}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {days: [], interviewers:[], appointments: []});

  function reducer (state, action) {
    switch(action.type) {
      case SET_DAY:
        return {...state, day: action.value};
      case SET_APPLICATION_DATA:
        debugger
        const days = action.value[0].data;
        const appointments = action.value[1].data;
        const interviewers = action.value[2].data;

        return {...state, days, appointments, interviewers};
      case SET_INTERVIEW:
        const newAppointment = action.value;
        return {...state, newAppointment};
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }    
  }

  // const setDay = day => setState({...state, day});
  const setDay = day => dispatch({ type: SET_DAY, value: day });

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
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        // setState({...state, appointments});
        dispatch({ type: SET_INTERVIEW, value: appointments });
      })
      .catch(err => console.err(err)); // FIXME: why is this working?
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    };

    // update appointments with appointment with interview set to null
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        // setState({ ...state, appointments });
        dispatch({ type: SET_INTERVIEW, value: appointments});
      })
      .catch(err => console.err(err)); // FIXME: why is this working?
  };

  // getting day, appointments, interview data from /api/ and then setting state
  useEffect(() => {
    Promise
      .all([
        Promise.resolve(axios.get('/api/days')),
        Promise.resolve(axios.get('/api/appointments')),
        Promise.resolve(axios.get('/api/interviewers'))
      ])
      .then((all) => {
        // setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        dispatch({ type: SET_APPLICATION_DATA, value: all });
      })
      .catch(err => console.error(err));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}