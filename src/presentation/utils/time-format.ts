export const formattedTime = (): string => {
  const options = { timeZone: "Asia/Kolkata" };
  const currentDate = new Date().toLocaleString("en-US", options);
  const date = new Date(currentDate);
  const dateObject = new Date(date);

  // Get hours, minutes, and seconds
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // Format the time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};
