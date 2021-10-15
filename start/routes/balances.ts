import Route from '@ioc:Adonis/Core/Route';
import BalanceModel from 'App/Models/BalanceModel';

Route.get('balances/:iban', async ({ request }) => {
  const iban = request.params().iban;

  return await BalanceModel.query()
    .whereHas('account', (accountQuery) => {
      accountQuery.where('iban', iban);
    })
    .preload('account');
});
