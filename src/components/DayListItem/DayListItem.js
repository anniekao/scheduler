import React from 'react';
import './DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const { spots, selected, id, setDay, name } = props
  const formatSpots = () => {
    let formatted = "";
    switch(spots) {
    case 0:
      formatted += `no spots remaining`;
      break;
    case 1:
      formatted += `1 spot remaining`;
      break;
    default:
      formatted += `${ spots } spots remaining`;
    }
    return formatted;
  };
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  return (
    <li className={dayClass} key={ id } onClick={ setDay } data-testid="day">
      <h2 className="text--regular">{ name }</h2>
      <h3 className="text--light">{ formatSpots() }</h3>
    </li>
  );
}