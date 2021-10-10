import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('incoming-payments', async () => {
  return Database.from('transactions')
    .select('transactions.*', 'accounts.name AS account')
    .leftJoin('accounts', 'iban', 'account')
    .where('ack', false)
    .orderBy('bookingDate', 'desc');
});
