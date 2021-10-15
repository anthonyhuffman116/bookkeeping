import Route from '@ioc:Adonis/Core/Route';
import Payment from 'App/Models/Payment';
import Transaction from 'App/Models/Transaction';

Route.get('payments', async () => {
  return await Payment.query()
    .orderBy('bookingDate', 'desc')
    .preload('category')
    .preload('transaction');
});

Route.post('payments', async ({ request, response }) => {
  const payment = request.body();
  delete payment.transaction;

  const transaction = await Transaction.findOrFail(payment.incomingPaymentId);
  transaction.ack = true;
  transaction.save();

  await Payment.create(payment);

  response.status(201);

  return payment;
});
