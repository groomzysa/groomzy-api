export interface IProviderDoneBookingArgs {
  bookingId: number;
  done: boolean;
}

export interface IProviderCancelBookingArgs {
  bookingId: number;
  cancel: boolean;
}
