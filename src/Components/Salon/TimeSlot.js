import React from 'react';
import { Table } from 'react-bootstrap';

const TimeSlotTable = ({ timeSlots }) => {
  const groupByDay = () => {
    if (!timeSlots) return {}; // Check if timeSlots is undefined

    const groupedTimeSlots = {};
    timeSlots.forEach((timeSlot) => {
      const { day } = timeSlot;
      if (!groupedTimeSlots[day]) {
        groupedTimeSlots[day] = [];
      }
      groupedTimeSlots[day].push(timeSlot);
    });
    return groupedTimeSlots;
  };

  const groupedTimeSlots = groupByDay();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Day</th>
          <th>Time Slots</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedTimeSlots).map((day, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{day}</td>
            <td>
              {groupedTimeSlots[day].map((timeSlot) => (
                <div key={timeSlot.id}>
                  {timeSlot.start_time} - {timeSlot.end_time}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TimeSlotTable;
