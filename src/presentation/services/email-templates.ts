
import * as fs from 'fs';
import * as path from 'path';

// Read the HTML/CSS email template file

const filePath ='./dist/presentation/nodemailer/email-template'

function readEmailTemplate(filePath: string): string {
  try {
    return fs.readFileSync(`${filePath}/add-reservation-template.html`, 'utf-8');
  } catch (error) {
    console.error('Error reading email template:', error);
    return ''; // Return an empty string or handle the error as needed
  }
}

const emailTemplate = readEmailTemplate(filePath);

export function reservationTemplate(result: any, clientWithEmail: any): string {
  // Replace placeholders with actual data in the email template
  const emailContent = emailTemplate
    .replace("[Client's First Name]", result.client.firstName)
    .replace('[Reservation Date]', result.date)
    .replace('[Number of Guests]', result.noOfGuests)
    .replace('[Shift]', result.shift.shiftName)
    .replace('[Duration]', result.duration)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Time Slot]', result.timeSlot)
    .replace('[Table Number]', result.table.tableNo)
    .replace('[Reservation Note]', result.reservationNote)
    .replace('[Perks]', result.perks)
    .replace('[Support Email Address]', '[Your Support Email Address]') // Replace with actual support email
    .replace('[Support Phone Number]', '[Your Support Phone Number]'); // Replace with actual support phone number

  return emailContent;
}
function readCustomerLeftEmailTemplate(filePath: string): string {
    try {
      return fs.readFileSync(`${filePath}/post-dining-email.html`, 'utf-8');
    } catch (error) {
      console.error('Error reading email template:', error);
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
      console.error('Error reading email template:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }
  
  const operationTeamTemplate = readManagerTemplate(filePath);
  
  export function operationTeam(result: any, clientWithEmail: any): string {
    // Replace placeholders with actual data in the email template
    const emailContent = operationTeamTemplate
      .replace("[Client's Full Name]", result.firstName)
      .replace('[Reservation Date]', result.date)
      .replace('[Number of Guests]', result.noOfGuests)
      .replace('[Shift]', result.shift.shiftName)
      .replace('[Duration]', result.duration)
      .replace('[Seating Area]', result.seatingArea.seatingAreaName)
      .replace('[Time Slot]', result.timeSlot)
      .replace('[Table Number]', result.table.tableNo)
      .replace('[Reservation Note]', result.reservationNote)
      .replace('[Perks]', result.perks)
      .replace('[Support Email Address]', '[Your Support Email Address]') // Replace with actual support email
      .replace('[Support Phone Number]', '[Your Support Phone Number]'); // Replace with actual support phone number
  
    return emailContent;
  }

  function userTemplate(filePath: string): string {
    try {
      return fs.readFileSync(`${filePath}/user-email-template.html`, 'utf-8');
    } catch (error) {
      console.error('002 Error reading email template:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  }
const userEmailTemplate = userTemplate(filePath);

  export function userAccountTemplate(result: any): string {
    const emailContent = userEmailTemplate
    .replace("[User's First Name]", result.firstName)
    .replace("[User's Email]", result.email)
    .replace("[User's Random Password]", result.randomPassword)
    
    console.log(emailContent,"emailContent")
    return emailContent;
          
  }


