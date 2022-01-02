import Route from '@ioc:Adonis/Core/Route';
import PaymentModel from 'App/Models/PaymentModel';
import TransactionModel from 'App/Models/TransactionModel';

Route.get('payments', async () => {
  return await PaymentModel.query()
    .orderBy('bookingDate', 'desc')
    .preload('category')
    .preload('transaction')
    .orderBy('bookingDate', 'desc')
    .limit(50);
});

Route.post('payments', async ({ request, response }) => {
  const payment = request.body();
  delete payment.transaction;

  const transaction = await TransactionModel.findOrFail(payment.incomingPaymentId);
  transaction.ack = true;
  transaction.save();

  await PaymentModel.create(payment);

  response.status(201);

  return payment;
});
