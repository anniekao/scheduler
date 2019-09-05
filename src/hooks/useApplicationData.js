import { useEffect, useReducer } from "react";
import axios from "axios";
// import { setSpots, getDayByAppointmentId } from "../components/helpers/selectors";


export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    interviewers: [],
    appointments: []
  });

  function reducer(state, action) {

    // if cancelling or booking an interview, update the number of spots for that day
    // returns a new days object
    const setSpots = () => {
      if (action.value.spots === "dec") {
        return state.days.map(item => {
          if (item.name !== state.day) {
            return item;
          }
          return {
            ...item,
            spots: item.spots - 1
          };
        });
      } else {
        return state.days.map(item => {
          if (item.name !== state.day) {
            return item;
          }
          return {
            ...item,
            spots: item.spots + 1
          };
        });
      }
    };

    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        const days = action.value[0].data;
        const appointments = action.value[1].data;
        const interviewers = action.value[2].data;
        return { ...state, days, appointments, interviewers };
      case SET_INTERVIEW:
        const newDays = setSpots();
        return { ...state, appointments: action.value.appointments, days: newDays};
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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

    // pass as value to dispatch to mark it as "DECREMENT value of spots"
    const spots = "dec";
    // update appointments with the new appointment
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments, spots } });
      })
      .catch(err => console.err(err)); // FIXME: why is this working?
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

      // pass as value to dispatch to mark it as "DECREMENT value of spots"
    const spots = "inc";

    // update appointments with appointment with interview set to null
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments, spots } });
      })
      .catch(err => console.err(err)); // FIXME: why is this working?
  };

  // getting day, appointments, interview data from /api/ and then setting state
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then(all => {
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
