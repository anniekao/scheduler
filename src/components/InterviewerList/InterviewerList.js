import React from 'react';

import '../InterviewerListItem/InterviewerListItem';
import './InterviewerList.scss';
import InterviewListItem from '../InterviewerListItem/InterviewerListItem';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer =>
    <InterviewListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}