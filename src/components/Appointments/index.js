import React from 'react';

import './styles.scss';
import Header from './header';
import Show from './show';
import Empty from './empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './form';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  // const EDIT = 'EDIT';
  // const SAVING = 'SAVING';
  // const CONFIRM = 'CONFIRM';
  // const DELETING = 'DELETING';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 
  
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={props.onSave}
          onCancel={() => transition(EMPTY)}
        />
      )}
    </article>
  );
}