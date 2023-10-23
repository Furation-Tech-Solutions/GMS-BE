
import * as fs from 'fs';
import * as path from 'path';

import axios from 'axios';

// Amazon S3 URL to the HTML email template
const s3ReservationEmailTemplateUrl = 'https://gms-media-assets.s3.ap-south-1.amazonaws.com/template'
 function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weekday = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${weekday}, ${day} ${month} ${year}`;
}
function formatTime(inputTime: string): string {
  const timeParts = inputTime.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];
  const period = hours >= 12 ? "PM" : "AM";
  
  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  return `${formattedHours}:${minutes} ${period}`;
}

async function readEmailTemplateFromS3(s3Url:string):Promise<string> {
  try {
    const response = await axios.get(s3Url);
    return response.data;
  } catch (error) {
    // console.error('Error reading email template from S3:', error);
    return ''; // Return an empty string or handle the error as needed
  }
}
export async function userAccountTemplate(result: any): Promise<string> {
const userEmailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/userRegistration.html`);
  const emailContent = userEmailTemplate
  // .replace("[User's First Name]", result.firstName)
  .replace("[User Email]", result.email)
  .replace("[User Password]", result.randomPassword)
  return emailContent;     
}
export async function bookingRequestTemplate(result: any): Promise<string> {
  const fullName=result.client.firstName+" "+result.client.lastName
  const date=await formatDate(result.date)
  // const date="12121"
  const startTime =await  formatTime(result.timeSlot);
  const bookingRequestEmailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/under_process_reservation.html`);
    const emailContent = bookingRequestEmailTemplate
    // .replace("[User's First Name]", result.firstName)
    .replace("[Client's Full Name]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    .replace('[Time Slot]', startTime)
    .replace("[Client's First Name]", result.client.firstName)
    return emailContent;     
  }

export async function confirmReservationTemplate(result: any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/confirm_reservation.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
  const date=await formatDate(result.date)
  // const date="12121"
  const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's Full Name]", fullName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's First Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Table Number]', result.table.tableNo)
   
  return emailContent 
}

export async function cancelReservationTemplate(result: any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/cancelReservation.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
  const date=await formatDate(result.date)
  // const date="12121"
  const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's First Name]]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
    // .replace('[Seating Area]', result.seatingArea.seatingAreaName)
   
  return emailContent 
}
export async function leftReservationTemplate(result: any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/leftReservation.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName=result.client.firstName+" "+result.client.lastName
  const date=await formatDate(result.date)
  // const date="12121"
  const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    // .replace("[Client's First Name]]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Table Number]', result.table.tableNo)
    .replace('[Server Name]',result.serverName)
   
  return emailContent 
}

export async function reminderEmailTemplate(result: any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/reminder_email.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
  const date=await formatDate(result.date)
  // const date="12121"
  const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's First Name]", result.client.firstNam)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Table Number]', result.table.tableNo)
   
  return emailContent 
}
// Read the HTML/CSS email template file

const filePath = `${path.join(__dirname, "..", "nodemailer", "email-template")}`

// function readEmailTemplate(filePath: string): string {
//   try {
//     return fs.readFileSync(`${filePath}/add-reservation-template.html`, 'utf-8');
//   } catch (error) {
//     console.error('Error reading email template:', error);
//     return ''; // Return an empty string or handle the error as needed
//   }
// }

// // const emailTemplate = readEmailTemplate(filePath);

// export function reservationTemplate(result: any, clientWithEmail: any): string {
//   // Replace placeholders with actual data in the email template
//   const emailContent = emailTemplate
//     .replace("[Client's First Name]", result.client.firstName)
//     .replace('[Reservation Date]', result.date)
//     .replace('[Number of Guests]', result.noOfGuests)
//     .replace('[Shift]', result.shift.shiftName)
//     .replace('[Duration]', result.duration)
//     .replace('[Seating Area]', result.seatingArea.seatingAreaName)
//     .replace('[Time Slot]', result.timeSlot)
//     .replace('[Table Number]', result.table.tableNo)
//     .replace('[Reservation Note]', result.reservationNote)
//     .replace('[Perks]', result.perks)
//     .replace('[Support Email Address]', '[Your Support Email Address]') // Replace with actual support email
//     .replace('[Support Phone Number]', '[Your Support Phone Number]'); // Replace with actual support phone number

//   return emailContent;
// }
function readCustomerLeftEmailTemplate(filePath: string): string {
    try {
      return fs.readFileSync(`${filePath}/post-dining-email.html`, 'utf-8');
    } catch (error) {
      // console.error('Error reading email template:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }
const customerLeftemailTemplate = readCustomerLeftEmailTemplate(filePath);

  export function postDiningTemplate(result: any, clientWithEmail: any): string {
    // Replace placeholders with actual data in the email template
    const emailContent = customerLeftemailTemplate
      .replace("[Customer's Name]", result.client.firstName)
      // Replace with actual support phone number
  
    return emailContent;
  }
  function readManagerTemplate(filePath: string): string {
    try {
      return fs.readFileSync(`${filePath}/manager-email-template.html`, 'utf-8');
    } catch (error) {
      // console.error('Error reading email template:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }
  
  const operationTeamTemplate = readManagerTemplate(filePath);
  
  export async function operationTeam(result: any, clientWithEmail: any): Promise<string> {
    // Replace placeholders with actual data in the email template
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/operationTeamTemplate.html`);

    const fullName=result.client.firstName+" "+result.client.lastName
    const emailContent = emailTemplate
    .replace("[Client's Full Name]", fullName)
    .replace('[Reservation Date]', result.date)
    .replace('[Number of Guests]', result.noOfGuests)
    .replace('[Shift]', result.shift.shiftName)
    .replace('[Duration]', result.duration)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Time Slot]', result.timeSlot)
    .replace('[Reservation Note]', result.reservationNote)
 // Replace with actual support phone number
  
    return emailContent;
  }

  function userTemplate(filePath: string): string {
    try {
      return fs.readFileSync(`${filePath}/user-email-template.html`, 'utf-8');
    } catch (error) {
      // console.error('002 Error reading email template:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }
// const userEmailTemplate = userTemplate(filePath);



