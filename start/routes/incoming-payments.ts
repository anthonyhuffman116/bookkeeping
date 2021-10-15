import Route from '@ioc:Adonis/Core/Route';
import TransactionModel from 'App/Models/TransactionModel';

Route.get('incoming-payments', async () => {
  return await TransactionModel.query()
    .where('ack', false)
    .orderBy('bookingDate', 'desc')
    .preload('account');
});
