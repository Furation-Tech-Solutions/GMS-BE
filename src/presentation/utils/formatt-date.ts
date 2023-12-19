// export const formattedDateFunc = (date: Date): string => {

//     const year = date.getUTCFullYear();
//     const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
//     const day = date.getUTCDate().toString().padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;

//     return formattedDate

// }

// this function return date in format yyyy-mm-dd
export const formattedDateFunc = (date: Date, months?: number): string => {
  const targetDate = new Date(date);
  if (months) {
    targetDate.setMonth(targetDate.getMonth() + months);
  }

  const year = targetDate.getUTCFullYear();
  const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = targetDate.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
