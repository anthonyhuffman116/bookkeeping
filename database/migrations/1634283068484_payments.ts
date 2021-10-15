import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Payments extends BaseSchema {
  protected tableName = 'payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary();
      table.timestamp('bookingDate', { useTz: true }).nullable();
      table.string('summary', 100).notNullable();
      table.integer('amount').notNullable();
      table.uuid('categoryId').notNullable();
      table.uuid('incomingPaymentId').notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
