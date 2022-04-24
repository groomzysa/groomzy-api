export interface IClientBookArgs {
  providerId: number;
  serviceId: number;
  staffId: number;
  bookingDate: string;
  bookingTime: string;
  inHouse: boolean;
  address?: string;
}

export interface IClientCompleteBookingArgs {
  bookingId: number;
  complete: boolean;
}

export interface IClientCancelBookingArgs {
  bookingId: number;
  cancel: boolean;
}

export interface IClientDeleteBookingArgs {
  bookingId: number;
  delete: boolean;
}

export interface IClientRateBookingArgs {
  bookingId: number;
  ratingId?: number;
  comment?: string;
  rate: number;
}
