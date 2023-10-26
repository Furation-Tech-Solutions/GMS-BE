// Assuming resData.timeSlot is in a valid time format, e.g., "20:30:00"


export function formatTimeAmPm(timeSlot: string) {

const timeParts = timeSlot.split(":");
let hour = parseInt(timeParts[0]);
let minute = parseInt(timeParts[1]);

  let period = "AM";
  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  }
  if (hour === 0) {
    hour = 12;
  }
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${formattedHour}:${formattedMinute} ${period}`;
}
