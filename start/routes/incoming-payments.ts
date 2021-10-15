import Route from '@ioc:Adonis/Core/Route';
import Transaction from 'App/Models/Transaction';

Route.get('incoming-payments', async () => {
  return await Transaction.query()
    .where('ack', false)
    .orderBy('bookingDate', 'desc')
    .preload('account');
});
