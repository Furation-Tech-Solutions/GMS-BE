
import * as fs from 'fs';
import * as path from 'path';

// Read the HTML/CSS email template file
// const filePath = path.join(__dirname, '../src','presentation', 'template', 'email-template', 'add-reservation-template.html');
// const filePath ='./src/presentation/template/email-template/add-reservation-template.html'
const filePath ='./src/presentation/template/email-template'
//  path.join(__dirname, '../src','presentation', 'template', 'email-template', 'add-reservation-template.html');

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
    .replace('[Client\'s First Name]', clientWithEmail.firstName)
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
      .replace("[Customer's Name]", clientWithEmail.firstName)
      // Replace with actual support phone number
  
    return emailContent;
  }

