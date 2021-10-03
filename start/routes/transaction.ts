import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.post('transactions/:id/ack', async ({ request, response }) => {
  const id = request.params().id;

  await Database.from('transactions').where('id', id).update({ ack: true });

  response.status(204);
});

Route.get('transactions', async () => {
  return Database.from('transactions')
    .select('*')
    .where('ack', false)
    .orderBy('bookingDate', 'desc');
});
