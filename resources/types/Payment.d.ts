type Payment = {
  id: string;
  bookingDate: Date;
  summary: string;
  amount: number;
  incomingPaymentId: string;
  categoryId: null | string;
  transaction: null | IncomingPayment;
};

type AppliedPayment = Payment & {
  category: Category;
};
