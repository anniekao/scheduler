export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0 || state.days.map(item => item.name).includes(day) === false) return [] 
  const filteredAppts = state.days.filter(item => item.name === day)[0].appointments;
  return filteredAppts.map(apptId => state.appointments[apptId]);
 
}

