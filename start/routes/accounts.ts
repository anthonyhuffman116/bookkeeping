import Route from '@ioc:Adonis/Core/Route';
import AccountModel from 'App/Models/AccountModel';

Route.get('accounts', async () => {
  return await AccountModel.query();
});
