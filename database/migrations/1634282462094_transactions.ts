import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary();
      table.string('name', 255).notNullable();
      table.string('summary', 255).notNullable().defaultTo('');
      table.integer('amount').notNullable();
      table.string('account', 33).notNullable();
      table.boolean('ack').notNullable().defaultTo(false);
      table.timestamp('bookingDate', { useTz: true }).notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();

      table.unique(['summary', 'amount', 'bookingDate']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
