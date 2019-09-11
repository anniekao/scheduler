import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_INTERVIEW,
  UPDATE_SPOTS
} from "../reducers/application";


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
