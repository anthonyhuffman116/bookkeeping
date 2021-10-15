import Route from '@ioc:Adonis/Core/Route';
import Account from 'App/Models/Account';

Route.get('accounts', async () => {
  return await Account.query();
});
