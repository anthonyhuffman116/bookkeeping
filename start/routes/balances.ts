import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('balances', async () => {
  return Database.from('balances')
    .select('balances.*', 'accounts.name AS account')
    .leftJoin('accounts', 'iban', 'account')
    .where('accounts.name', 'Girokonto') // TODO: select via param to IBAN
    .orderBy('bookingDate', 'desc');
});
