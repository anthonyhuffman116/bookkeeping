import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.post('categories', async ({ request }) => {
  await Database.table('categories').insert(request.body());

  return request.body();
});

Route.get('categories', async () => {
  return Database.from('categories').select('*').orderBy('summary', 'asc');
});
