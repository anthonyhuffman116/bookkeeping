export default interface IncomingPayment {
  id: number;
  name: string;
  summary: string;
  accountIban: null | string;
  amount: number;
  ack: boolean;
  bookingDate: Date;
}
