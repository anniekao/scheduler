import React from 'react';

import './styles.scss';
import Header from './header';
import Show from './show';
import Empty from './empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './form';
import Status from './status';
import Confirm from './confirm';
import Error from './error';

export default function Appointment(props) {
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
    props.interview ? SHOW : EMPTY
  ); 

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);

    setTimeout(() => {
      if (props.bookInterview(props.id, interview)) {
         transition(SHOW);
      } else {
        transition(ERROR_SAVE, true);
      }
    }, 1500);
   };

   const cancel = () => {
     transition(DELETING, true);

     setTimeout(() => {
      if (props.onCancel(props.id)){

        transition(EMPTY);
      } else {
        transition(ERROR_DELETE, true);
      }
     }, 1500);
   };
  
   return (
     <article className="appointment">
       <Header time={props.time} />

       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
       {mode === SHOW && (
         <Show
           student={props.interview.student}
           interviewer={props.interview.interviewer.name}
           onCancel={() => transition(CONFIRM)}
           onEdit={() => transition(EDIT)}
         />
       )}
       {mode === CREATE && (
         <Form
           interviewers={props.interviewers}
           onSave={save}
           onCancel={() => transition(EMPTY)}
         />
       )}
       {mode === SAVING && <Status message="Saving" />}

       {mode === CONFIRM && (
         <Confirm
           message="Delete the appointment?"
           onCancel={() => back()}
           onConfirm={cancel}
         />
       )}

       {mode === DELETING && <Status message="Deleting" />}
       {mode === EDIT && (
         <Form
           interviewers={props.interviewers}
           name={props.interview.student}
           interviewer={props.interview.interviewer.id}
           onSave={save}
           onCancel={() => transition(SHOW)}
         />
       )}

       {mode === ERROR_DELETE && (
         <Error message="Error deleting appointment" onClose={() => back()}/>
       )}

       {mode === ERROR_SAVE && (
         <Error message="Error saving appoitment" onClose={() => back()}/>
       )}
     </article>
   );
}