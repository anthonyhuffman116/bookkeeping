import Category from './Category';
import IncomingPayment from './IncomingPayment';

export default interface Payment {
  id: string;
  bookingDate: Date;
  summary: string;
  amount: number;
  incomingPaymentId: string;
  categoryId: null | string;
  transaction: null | IncomingPayment;
}

export interface AppliedPayment extends Payment {
  category: Category;
}
