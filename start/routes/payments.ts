import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('payments', async () => {
  return Database.from({ p: 'payments' })
    .select('p.*', 'categories.summary AS category')
    .innerJoin('categories', 'categories.id', 'categoryId')
    .orderBy('p.bookingDate', 'desc');
});

Route.post('payments', async ({ request, response }) => {
  const payment = request.body();

  await Database.from('transactions').where('id', payment.incomingPaymentId).update({ ack: true });
  await Database.table('payments').insert(payment);

  response.status(201);

  return payment;
});
