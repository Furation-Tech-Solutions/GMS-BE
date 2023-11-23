import * as fs from 'fs';
import * as path from 'path';

import axios from 'axios';

// Amazon S3 URL to the HTML email template
const s3ReservationEmailTemplateUrl = 'https://gms-media-assets.s3.ap-south-1.amazonaws.com/template'
 

async function readEmailTemplateFromS3(s3Url:string):Promise<string> {
  try {
    const response = await axios.get(s3Url);
    return response.data;
  } catch (error) {
    // console.error('Error reading email template from S3:', error);
    return ''; // Return an empty string or handle the error as needed
  }
}
export async function userAccountTemplate(result: any,outlet:any,outletName:any,password:string): Promise<string> {
  
const userEmailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/userRegistration.html`);
// console.log(userEmailTemplate,"userEmail template") 
const address=outlet.address.replace(/Mumbai.*/, '')
const emailContent = userEmailTemplate
  // .replace("[User's First Name]", result.firstName)
  .replace("[brandLogo]",outlet.brandLogo)
  .replace("[User Email]", result.email)
  .replace("[User Password]", password)
  .replace("[outletAddress]",address)
  .replace("[outletCity]",outlet.city)
  .replace("[outletState]",outlet.state)
  .replace("[outletPincode]",outlet.pincode)
  .replace(/\[outletName\]/g,outlet.outletName)
  .replace("[outletContact]",outlet.phone)
  return emailContent;     
}
export async function bookingRequestTemplate(result: any,date:any,startTime:any,outlet:any): Promise<string> {
  const fullName=result.client.firstName+" "+result.client.lastName
const address=outlet.address.replace(/Mumbai.*/, '')

  // const date=await formatDate(result.date)
  // const date="12121"
  // const startTime =await  formatTime(result.timeSlot);
  // console.log(outlet,"outletName")
  const bookingRequestEmailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/under_process_reservation.html`);
    const emailContent = bookingRequestEmailTemplate
    // .replace("[User's First Name]", result.firstName)
    .replace("[Client's Full Name]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    .replace('[Time Slot]', startTime)
    .replace("[Client's First Name]", result.client.firstName)
  .replace("[brandLogo]",outlet.brandLogo)
    .replace("[outletAddress]",address)
    .replace("[outletCity]",outlet.city)
    .replace("[outletState]",outlet.state)
    .replace("[outletPincode]",outlet.pincode)
    .replace(/\[outletName\]/g,outlet.outletName)
    .replace("[outletContact]",outlet.phone)
    .replace("[mapLocation]",outlet.location)
    return emailContent;     
  }

export async function confirmReservationTemplate(result: any,date:any,startTime:any,outlet:any): Promise<string> {
  // Fetch the email template from S3
  
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/confirm_reservation.html`);
const address=outlet.address.replace(/Mumbai.*/, '')
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
  // const date=await formatDate(result.date)
  // // const date="12121"
  // const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's Full Name]", fullName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's First Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
  .replace("[brandLogo]",outlet.brandLogo)
    .replace("[outletAddress]",address)
    .replace("[outletCity]",outlet.city)
    .replace("[outletState]",outlet.state)
    .replace("[outletPincode]",outlet.pincode)
    .replace(/\[outletName\]/g,outlet.outletName)
    .replace("[outletContact]",outlet.phone)
    .replace("[mapLocation]",outlet.location)
    // .replace('[Table Number]', result.table.tableNo)
   
  return emailContent 
}

export async function cancelReservationTemplate(result: any,date:any,startTime:any,outlet:any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/cancelReservation.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
const address=outlet.address.replace(/Mumbai.*/, '')

  // const date=await formatDate(result.date)
  // // const date="12121"
  // const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's First Name]]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
  .replace("[brandLogo]",outlet.brandLogo)
    .replace("[outletAddress]",address)
  .replace("[outletCity]",outlet.city)
  .replace("[outletState]",outlet.state)
  .replace("[outletPincode]",outlet.pincode)
  .replace(/\[outletName\]/g,outlet.outletName)
  .replace("[outletContact]",outlet.phone)
  .replace("[mapLocation]",outlet.location)
    // .replace('[Seating Area]', result.seatingArea.seatingAreaName)
   
  return emailContent 
}
export async function leftReservationTemplate(result: any,date:any,startTime:any,outlet:any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/leftReservation.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName=result.client.firstName+" "+result.client.lastName
const address=outlet.address.replace(/Mumbai.*/, '')

  // const date=await formatDate(result.date)
  // // const date="12121"
  // const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    // .replace("[Client's First Name]]", result.client.firstName)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Table Number]', result.table.tableNo ? " " : " ")
    .replace('[Server Name]',result.serverName)
  .replace("[brandLogo]",outlet.brandLogo)
    .replace("[outletAddress]",address)
    .replace("[outletCity]",outlet.city)
    .replace("[outletState]",outlet.state)
    .replace("[outletPincode]",outlet.pincode)
    .replace(/\[outletName\]/g,outlet.outletName)
    .replace("[outletContact]",outlet.phone)
    .replace("[mapLocation]",outlet.location)
   
  return emailContent 
}

export async function reminderEmailTemplate(result: any,date:any,startTime:any,outlet:any): Promise<string> {
  // Fetch the email template from S3
  const emailTemplate = await readEmailTemplateFromS3(`${s3ReservationEmailTemplateUrl}/reminder_email.html`);
  
  // Replace placeholders with actual data in the email template
  const fullName= result.client.firstName+" "+result.client.lastName
const address=outlet.address.replace(/Mumbai.*/, '')

  // const date=await formatDate(result.date)
  // // const date="12121"
  // const startTime =await  formatTime(result.timeSlot);
  
  const emailContent = emailTemplate
    .replace("[Client's First Name]", result.client.firstNam)
    .replace('[Reservation Date]', date)
    .replace('[Number of Guests]', result.noOfGuests)
    // .replace('[Shift]', result.shift.shiftName)
    .replace('[Time Slot]', startTime)
    .replace("[Client's Full Name]",fullName)
    .replace('[Seating Area]', result.seatingArea.seatingAreaName)
    .replace('[Table Number]', result.table.tableNo ? " " :" ")
  .replace("[brandLogo]",outlet.brandLogo)
    .replace("[outletAddress]",address)
    .replace("[outletCity]",outlet.city)
    .replace("[outletState]",outlet.state)
    .replace("[outletPincode]",outlet.pincode)
    .replace(/\[outletName\]/g,outlet.outletName)
    .replace("[outletContact]",outlet.phone)
    .replace("[mapLocation]",outlet.location)
   
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