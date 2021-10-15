import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Accounts extends BaseSchema {
  protected tableName = 'accounts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('iban', 33).notNullable().primary();
      table.string('name', 70);
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
