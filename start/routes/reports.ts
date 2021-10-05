import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('reports/:from/:to', async ({ request }) => {
  const from = request.params().from;
  const to = request.params().to;

  const report = await Database.rawQuery(
    `SELECT c.id, c.summary, c."expectedAmount", c.every, c."dueDate", x.amount
  FROM categories c
  LEFT JOIN (SELECT p."categoryId", SUM(p.amount) AS amount
      FROM payments p
      WHERE "bookingDate" BETWEEN ? AND ?
      GROUP BY p."categoryId") AS x ON x."categoryId" = c.id
  WHERE ("dueDate" BETWEEN ? AND ? OR "dueDate" IS NULL)
  AND c."isActive" = true
  ORDER BY every, summary`,
    [from, to, from, to]
  );

  return report.rows;
});
