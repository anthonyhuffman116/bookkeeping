import Route from '@ioc:Adonis/Core/Route';
import BalanceModel from 'App/Models/BalanceModel';

Route.get('balances/:iban/:from/:to', async ({ request }) => {
  const from = request.params().from;
  const to = request.params().to;
  const iban = request.params().iban;

  return await BalanceModel.query()
    .whereBetween('bookingDate', [from, to])
    .whereHas('account', (accountQuery) => {
      accountQuery.where('iban', iban);
    })
    .preload('account');
});
