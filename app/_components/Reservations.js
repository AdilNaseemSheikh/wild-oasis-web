import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";

async function Reservations({ cabin }) {
  // fetching data for date selector and resrevation here cuz it is server comp. and they are client comp.
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservations;
