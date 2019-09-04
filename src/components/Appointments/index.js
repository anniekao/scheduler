import React from 'react';

import './styles.scss';
import Header from './header';
import Show from './show';
import Empty from './empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './form';
import Status from './status';
import Confirm from './confirm';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';

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
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, 1500);
    
   };

   const cancel = () => {
     transition(DELETING);

     setTimeout(() => {
      props.onCancel(props.id);
      transition(EMPTY);
     }, 1500);
   };
  
  //  const edit = (id) => {

  //  };
   
   return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onCancel={() => transition(CONFIRM)}
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
          onCancel={() => transition(SHOW)}
          onConfirm={ cancel }
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
    </article>
  );
}