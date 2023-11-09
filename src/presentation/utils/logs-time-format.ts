export function logTime() {
    const currentDate = new Date();
    const options: any = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false, // 24-hour time format
    };
  
    const dateTimeString = currentDate.toLocaleString('en-US', options);
    return dateTimeString;
  }
  
//   const currentDateTime = getCurrentDateTime();
//   console.log(currentDateTime);