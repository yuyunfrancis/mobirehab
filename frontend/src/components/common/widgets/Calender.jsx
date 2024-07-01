import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AvailabilityDayPicker = ({ availabilities, onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const dates = availabilities.map(
      (availability) => new Date(availability.date)
    );
    setAvailableDates(dates);
  }, [availabilities]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateClick) {
      onDateClick(formatDate(date));
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateAvailable = (date) => {
    return availableDates.some(
      (availableDate) => formatDate(availableDate) === formatDate(date)
    );
  };

  return (
    <div>
      <DayPicker
        selected={selectedDate}
        onDayClick={handleDateClick}
        disabled={{ before: new Date() }}
        modifiers={{
          available: (date) => isDateAvailable(date),
          selectedAvailable: (date) =>
            selectedDate &&
            isDateAvailable(date) &&
            formatDate(date) === formatDate(selectedDate),
        }}
        modifiersStyles={{
          available: {
            backgroundColor: "#e6fffa",
            color: "#047857",
            fontWeight: "bold",
          },
          selectedAvailable: {
            backgroundColor: "#047857",
            color: "#ffffff",
            fontWeight: "bold",
          },
          selected: {
            backgroundColor: "#047857",
            color: "#ffffff",
            fontWeight: "bold",
          },
        }}
        styles={{
          day: { margin: "0.2em" },
          caption: { color: "#374151" },
        }}
      />
    </div>
  );
};

export default AvailabilityDayPicker;
