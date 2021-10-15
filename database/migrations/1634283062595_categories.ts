import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Categories extends BaseSchema {
  protected tableName = 'categories';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary();
      table.string('summary', 100).notNullable();
      table.integer('expectedAmount').notNullable();
      table.timestamp('dueDate', { useTz: true }).nullable();
      table.integer('every').nullable();
      table.boolean('isActive').notNullable().defaultTo(true);
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
