type Payment = {
  id: string;
  bookingDate: Date;
  summary: string;
  amount: number;
  incomingPaymentId: string;
  categoryId: null | string;
};
