import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import CategoryModel from './CategoryModel';
import TransactionModel from './TransactionModel';

export default class PaymentModel extends BaseModel {
  public static table = 'payments';

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

  @belongsTo(() => CategoryModel)
  public category: BelongsTo<typeof CategoryModel>;

  @column({ columnName: 'incomingPaymentId', serializeAs: 'incomingPaymentId' })
  public incomingPaymentId: string;

  @belongsTo(() => TransactionModel, { foreignKey: 'incomingPaymentId' })
  public transaction: BelongsTo<typeof TransactionModel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
