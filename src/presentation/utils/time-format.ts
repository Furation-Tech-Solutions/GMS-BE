export const formattedTime = (hoursToAdd: number = 0): string => {
  const options = { timeZone: "Asia/Kolkata" };
  const currentDate = new Date().toLocaleString("en-US", options);
  const date = new Date(currentDate);

  // Add the specified hours
  date.setHours(date.getHours() + hoursToAdd);

  // Get the updated hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};
