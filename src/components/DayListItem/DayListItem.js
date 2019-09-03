import React from 'react';
import './DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const formatSpots = () => {
    let formatted = "";
    switch(props.spots) {
    case 0:
      formatted += `no spots remaining`;
      break;
    case 1:
      formatted += `1 spot remaining`;
      break;
    default:
      formatted += `${props.spots} spots remaining`;
    }
    return formatted;
  };
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} key={props.id} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}