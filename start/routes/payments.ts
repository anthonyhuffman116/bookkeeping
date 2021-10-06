import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.post('payments', async ({ request, response }) => {
  const payment = request.body();

  await Database.from('transactions').where('id', payment.incomingPaymentId).update({ ack: true });
  await Database.table('payments').insert(payment);

  response.status(201);

  return payment;
});
