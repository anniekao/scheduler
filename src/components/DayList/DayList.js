import React from 'react';
import DayListItem from 'components/DayListItem/DayListItem';

export default function DayList(props) {
  const { days, setDay } = props;
  const listing = days.map((day) => 
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={(event) => setDay(day.name)} />
  );

  return (
    <ul>
      { listing }
    </ul>
  );
};