// Define an interface for your WhatsApp message template
interface WhatsAppTemplate {
    message: (reservation: any) => string;
  }
  
  // Create a WhatsApp message template object
  export const createWhatsAppMessage: WhatsAppTemplate = {
    message: (reservation: any) => {
      return `Hello ${reservation.client.firstName},
  
  We are pleased to inform you that your reservation has been successfully created:
  
  Reservation Date: ${reservation.date}
  Number of Guests: ${reservation.noOfGuests}
  Shift: ${reservation.shift.shiftName}
  Duration: ${reservation.duration}
  Seating Area: ${reservation.seatingArea.seatingAreaName}
  Time Slot: ${reservation.timeSlot}
  Table Number: ${reservation.table.tableNo}
  Reservation Note: ${reservation.reservationNote}
  Perks: ${reservation.perks}
  
  Your reservation is confirmed and ready for your visit. If you have any questions or need to make changes, please don't hesitate to contact us.
  
  We look forward to serving you and providing a wonderful dining experience.
  
  Best regards,
  [Your Hotel Name] Team`;
    },
  };
  