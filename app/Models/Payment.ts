import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Category from './Category';
import Transaction from './Transaction';

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column.dateTime({ columnName: 'bookingDate', serializeAs: 'bookingDate' })
  public bookingDate: DateTime;

  @column()
  public summary: string;

  @column()
  public amount: number;

  @column({ columnName: 'categoryId', serializeAs: 'categoryId' })
  public categoryId: string;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @column({ columnName: 'incomingPaymentId', serializeAs: 'incomingPaymentId' })
  public incomingPaymentId: string;

  @belongsTo(() => Transaction, { foreignKey: 'incomingPaymentId' })
  public transaction: BelongsTo<typeof Transaction>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
