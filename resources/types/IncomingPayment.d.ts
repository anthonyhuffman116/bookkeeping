type IncomingPayment = {
  id: number;
  name: string;
  summary: string;
  account: string;
  amount: number;
  ack: boolean;
  bookingDate: Date;
};
