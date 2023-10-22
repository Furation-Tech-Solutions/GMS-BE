export interface IRFilter {
  q?: string;
  date?: string;
  shift?: string;
  reservationStatus?: string;
  table?: string;
  timeSlot?:string;
}

export type  TReservationCover =  {
  _id: string,
  date: string,
  noOfGuests: number,
  shift: string,
  duration: string,
  timeSlot: string
}

export interface Icron {
  date: string,
  reservationStatus:string
}
