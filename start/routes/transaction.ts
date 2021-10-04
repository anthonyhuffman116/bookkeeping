import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('transactions', async () => {
  return Database.from('transactions')
    .select('*')
    .where('ack', false)
    .orderBy('bookingDate', 'desc');
});
