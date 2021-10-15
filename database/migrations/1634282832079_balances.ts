import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Balances extends BaseSchema {
  protected tableName = 'balances';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary();
      table.timestamp('bookingDate', { useTz: true }).notNullable();
      table.string('account', 33).notNullable();
      table.integer('amount').notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
