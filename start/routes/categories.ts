import Route from '@ioc:Adonis/Core/Route';
import CategoryModel from 'App/Models/CategoryModel';

Route.post('categories', async ({ request }) => {
  await CategoryModel.updateOrCreate(request.body(), request.body());

  return request.body();
});

Route.get('categories', async () => {
  return await CategoryModel.query().orderBy('summary');
});

Route.post('close-month/:date', async ({ request }) => {
  const [year, month] = request.params().date.split('-');

  const startOfMonth = new Date(year, month - 1, 1, 12);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);

  const promises = (await CategoryModel.query().whereBetween('dueDate', [startOfMonth, endOfMonth]))
    .map((c: CategoryModel) => {
      if (c.dueDate === null || c.every === null) {
        return c;
      }

      c.dueDate = c.dueDate?.plus({ months: c.every });

      return c;
    })
    .map(async (c: CategoryModel) => await c.save());

  await Promise.all(promises);

  return {};
});
