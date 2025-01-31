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


