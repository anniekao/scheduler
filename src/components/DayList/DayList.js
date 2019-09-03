import React from 'react';
import DayListItem from 'components/DayListItem/DayListItem';

// <DayList days={days} day={"Monday"} setDay={action("setDay")} />
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0
//   }
// ];

export default function DayList(props) {
  const listing = props.days.map((day) => 
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={(event) => props.setDay(day.name)} />
  );

  return (
    <ul>
      {listing}
    </ul>
  );
};