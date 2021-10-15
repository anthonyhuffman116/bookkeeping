import Route from '@ioc:Adonis/Core/Route';
import Balance from 'App/Models/Balance';

Route.get('balances', async () => {
  const filter = 'Girokonto';

  return await Balance.query()
    .whereHas('account', (accountQuery) => {
      accountQuery.where('name', filter);
    })
    .preload('account');
});
