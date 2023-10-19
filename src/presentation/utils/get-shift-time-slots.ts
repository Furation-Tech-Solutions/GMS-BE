


export const  generateTimeSlots = (shift: string, date: string, allShifts: any) => {

    const selectedDate = new Date(`${date}`);

    const filteredShifts = allShifts.filter((newShift: any) => {

        const shiftStartDate = new Date(newShift.startDate);

        if (newShift.endDate && new Date(newShift.endDate) < selectedDate) {
          return false;
        }

        if (selectedDate >= shiftStartDate && newShift.shiftCategory === shift) {
          return true;
        }

        return false;
      });

    for (const shift of filteredShifts) {
        const timeSlots: string[] = [];
        const firstSeatingTime = new Date(`${selectedDate.toISOString().slice(0, 10)}T${shift.firstSeating}`);
        const lastSeatingTime = new Date(`${selectedDate.toISOString().slice(0, 10)}T${shift.lastSeating}`);
        const timeInterval = shift.timeInterval;
        
        while (firstSeatingTime <= lastSeatingTime) {
          timeSlots.push(firstSeatingTime.toTimeString().slice(0, 8)); // Format as HH:mm

          firstSeatingTime.setMinutes(firstSeatingTime.getMinutes() + timeInterval);
        }
    
    return {
        timeSlots,
        filteredShifts
    };

    }
  }