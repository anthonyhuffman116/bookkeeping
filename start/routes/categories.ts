import Route from '@ioc:Adonis/Core/Route';
import CategoryModel from 'App/Models/CategoryModel';

Route.post('categories', async ({ request }) => {
  await CategoryModel.updateOrCreate(request.body(), request.body());

  return request.body();
});

Route.get('categories', async () => {
  return await CategoryModel.query().orderBy('summary');
});
