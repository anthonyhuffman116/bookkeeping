import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.post('regulars', async ({ request }) => {
  await Database.table('regulars').insert(request.body());

  return request.body();
});

Route.get('regulars', async () => {
  return Database.from('regulars').select('*').where('isActive', true).orderBy('summary', 'asc');
});
