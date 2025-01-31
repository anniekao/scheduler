import React from 'react';
import classNames from 'classnames';

import './InterviewerListItem.scss';

export default function InterviewListItem(props) {
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={classes} key={props.id} onClick={props.setInterviewer}>
      <img 
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
