type IncomingPayment = {
  id: number;
  name: string;
  summary: string;
  accountName: null | string;
  amount: number;
  ack: boolean;
  bookingDate: Date;
};
