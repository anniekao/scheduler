export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0 || state.days.map(item => item.name).includes(day) === false) return [];
  const filteredAppts = state.days.filter(item => item.name === day)[0].appointments;
  return filteredAppts.map(apptId => state.appointments[apptId]);
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0 || state.days.map(item => item.name).includes(day) === false) return [];
  const filteredInterviewers = state.days.filter(item => item.name === day)[0].interviewers;
  return filteredInterviewers.map(interviewerId => state.interviewers[interviewerId]);
}

export function getInterview(state, interview) {
  if (interview === null) return null;

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  
  return {
    "student": interview.student,
    "interviewer": interviewer
  };
}

// const state = [{
// id: 1,
// name: "Monday",
// appointments: [
// 1,
// 2,
// 3,
// 4,
// 5
// ],
// interviewers: [
// 1,
// 6,
// 7,
// 8,
// 10
// ],
// spots: 3
// },
// {
// id: 2,
// name: "Tuesday",
// appointments: [
// 6,
// 7,
// 8,
// 9,
// 10
// ],
// interviewers: [
// 2,
// 3,
// 8,
// 9,
// 10
// ],
// spots: 2
// },
// {
// id: 3,
// name: "Wednesday",
// appointments: [
// 11,
// 12,
// 13,
// 14,
// 15
// ],
// interviewers: [
// 2,
// 4,
// 5,
// 6,
// 10
// ],
// spots: 4
// },
// {
// id: 4,
// name: "Thursday",
// appointments: [
// 16,
// 17,
// 18,
// 19,
// 20
// ],
// interviewers: [
// 3,
// 6,
// 7,
// 9,
// 10
// ],
// spots: 2
// },
// {
// id: 5,
// name: "Friday",
// appointments: [
// 21,
// 22,
// 23,
// 24,
// 25
// ],
// interviewers: [
// 1,
// 2,
// 3,
// 7,
// 9
// ],
// spots: 5
// }
// ];

export function getDayByAppointmentId(state, id) {
  // checks to see if the id exists in appointments
  if (state.days.length === 0 || state.days.map(day => day.appointments).map(item => item.includes(id)).every(item => item === false) === true) return [];

  // returns the day containing that appointment id
  return state.days.filter(item => item.appointments.includes(id));
}

export function setSpots(days, day, action) {
  if (action === 'dec') {
    return days.map(item => {
      if (item.name !== day) {
        return item;
      }
      return {
        ...item,
        spots: item.spots + 1
      };
    });
  } else {
    return days.map(item => {
      if (item.name !== day) {
        return item;
      }
      return {
        ...item,
        spots: item.spots - 1
      };
    });
  }
  
}


