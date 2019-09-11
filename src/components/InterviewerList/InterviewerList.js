import React from 'react';
import PropTypes from 'prop-types';

import '../InterviewerListItem/InterviewerListItem';
import './InterviewerList.scss';
import InterviewListItem from '../InterviewerListItem/InterviewerListItem';

InterviewerList.propTypes ={
  setInterviewer: PropTypes.func.isRequired
};

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
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}