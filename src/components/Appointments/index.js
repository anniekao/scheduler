import React, { useEffect } from 'react';

import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const { interview, id, interviewers, time } = props;

  // transition states
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  ); 
    
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    if (interview.student && interview.interviewer) {
      transition(SAVING);

      props
        .bookInterview(id, interview)
        .then(() => transition(SHOW));
    } else {
      transition(ERROR_SAVE, true);    
    }
   };

   const cancel = () => {
    transition(DELETING, true);

    props
      .onCancel(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true);
      }); 
   };

   // ensures that an interview is shown only when an interview is booked
   useEffect(() => {
     if (interview && mode === EMPTY) {
       transition(SHOW);
     }
     if (interview === null && mode === SHOW) {
       transition(EMPTY);
     }
   }, [interview, transition, mode]);
  
   return (
     <article data-testid="appointment" className="appointment">
       <Header time={ time } />

       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
       {mode === SHOW && interview && (
         <Show
           student={ interview.student }
           interviewer={ interview.interviewer.name }
           onCancel={() => transition(CONFIRM)}
           onEdit={() => transition(EDIT)}
         />
       )}
       {mode === CREATE && (
         <Form
           interviewers={ interviewers }
           onSave={ save }
           onCancel={() => transition(EMPTY)}
         />
       )}
       {mode === SAVING && <Status message="Saving" />}

       {mode === CONFIRM && (
         <Confirm
           message="Delete the appointment?"
           onCancel={() => back()}
           onConfirm={ cancel }
         />
       )}

       {mode === DELETING && <Status message="Deleting" />}
       {mode === EDIT && (
         <Form
           interviewers={ props.interviewers }
           name={ props.interview.student }
           interviewer={ props.interview.interviewer.id }
           onSave={ save }
           onCancel={() => transition(SHOW)}
         />
       )}

       {mode === ERROR_DELETE && (
         <Error message="Error deleting appointment" onClose={() => back()} />
       )}

       {mode === ERROR_SAVE && (
         <Error message="Error saving appointment" onClose={() => back()} />
       )}
     </article>
   );
}