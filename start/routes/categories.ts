import Route from '@ioc:Adonis/Core/Route';
import Category from 'App/Models/Category';

Route.post('categories', async ({ request }) => {
  await Category.updateOrCreate(request.body(), request.body());

  return request.body();
});

Route.get('categories', async () => {
  return await Category.query().orderBy('summary');
});
