import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('payments', async () => {
  return Database.from({ p: 'payments' })
    .select(
      'p.*',
      'categories.summary AS category',
      't.summary AS transactionSummary',
      't.name AS transactionName'
    )
    .innerJoin('categories', 'categories.id', 'categoryId')
    .innerJoin('transactions AS t', 't.id', 'incomingPaymentId')
    .orderBy('p.bookingDate', 'desc');
});

Route.post('payments', async ({ request, response }) => {
  const payment = request.body();
  delete payment.transactionSummary;
  delete payment.transactionName;

  await Database.from('transactions').where('id', payment.incomingPaymentId).update({ ack: true });
  await Database.table('payments').insert(payment);

  response.status(201);

  return payment;
});
