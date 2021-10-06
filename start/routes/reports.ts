import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('reports/balances', async () => {
  const report = await Database.rawQuery(
    `SELECT DISTINCT ON (b.account) b.account AS iban, a.name AS account, b."bookingDate", b.amount
    FROM balances b
    LEFT JOIN accounts AS a ON a.iban = b.account
    ORDER BY b.account, b."bookingDate" DESC;`,
    []
  );

  return report.rows;
});

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
