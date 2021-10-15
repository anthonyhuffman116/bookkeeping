import Route from '@ioc:Adonis/Core/Route';
import Balance from 'App/Models/Balance';

Route.get('balances/:iban', async ({ request }) => {
  const iban = request.params().iban;

  return await Balance.query()
    .whereHas('account', (accountQuery) => {
      accountQuery.where('iban', iban);
    })
    .preload('account');
});
