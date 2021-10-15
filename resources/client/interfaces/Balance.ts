export default interface Balance {
  iban: string;
  account: null | string;
  bookingDate: Date;
  amount: number;
}
