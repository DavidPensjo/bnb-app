"use client";

import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setSelectionRange({
      ...selectionRange,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
    });
    onDateChange(startDate || new Date(), endDate || new Date());
  };

  return (
    <DateRange
      ranges={[selectionRange]}
      onChange={handleSelect}
      className=""
      minDate={new Date()}
      rangeColors={["#171717"]}
      showMonthAndYearPickers={false}
      showDateDisplay={false}
    />
  );
};

export default Calendar;
