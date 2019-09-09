import { useEffect, useReducer } from "react";
import axios from "axios";
// import { setSpots, getDayByAppointmentId } from "../components/helpers/selectors";

 const SET_DAY = "SET_DAY";
 const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
 const SET_INTERVIEW = "SET_INTERVIEW";
 const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";
 const UPDATE_SPOTS = "UPDATE_SPOTS";

 function reducer(state, action) {
   // if cancelling or booking an interview, update the number of spots for that day
   // returns a new days object
  
   const setSpots = () => {
     let count = 5;
     for (let day in state.days) {
       // FIXME: shorten state.days[day]
       if (state.days[day].name === state.day){
        for (let apptId of state.days[day].appointments) {
         if(state.appointments[apptId].interview !== null) {
          count--;
         }
        }
       }
     }
     return state.days.map(item => {
       if (item.name !== state.day) {
         return item;
       }
       return {
         ...item,
         spots: count
       };
     });
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
       return { ...state, appointments: action.value, days: setSpots() };
     case UPDATE_INTERVIEW:
       const newAppointment = {
         ...state.appointments[action.value.id],
         interview: action.value.interview
       };
       const newAppointments = {
         ...state.appointments,
         [action.value.id]: newAppointment
       };
       return { ...state, appointments: newAppointments };
     case UPDATE_SPOTS:
       return { ...state, days: setSpots()};
     default:
       throw new Error(
         `Tried to reduce with unsupported action type: ${action.type}`
       );
   }
 }

export default function useApplicationData() {
   const [state, dispatch] = useReducer(reducer, {
     day: "Monday",
     days: [],
     interviewers: [],
     appointments: []
   });

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
        dispatch({ type: SET_INTERVIEW, value: appointments });
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

    // update appointments with appointment with interview set to null
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: appointments });
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

  // Websocket to communicate with the server
  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8001");
    webSocket.onopen = () => {
      webSocket.send('ping');
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const appointment = {id: data.id, interview: data.interview};
      
      if(data.type === "SET_INTERVIEW" && data.interview === null ) {
        // update state with new appointment
        dispatch({ type: UPDATE_INTERVIEW, value: appointment });
      } else if (data.type === "SET_INTERVIEW" &&  data.interview !== null) {
        // update state minus the appointment
        dispatch({ type: UPDATE_INTERVIEW, value: appointment });
      }
      dispatch({ type: UPDATE_SPOTS });
    };

    webSocket.onerror = function(event) {
      console.error("WebSocket error observed:", event);
    };

    return () => { webSocket.close(); }; 
  }, []);
  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
