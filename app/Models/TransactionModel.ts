import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import AccountModel from './AccountModel';

export default class TransactionModel extends BaseModel {
  public static table = 'transactions';

  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public summary: string;

  @column({ columnName: 'account', serializeAs: 'accountIban' })
  public accountIban: string;

  @column()
  public amount: number;

  @column()
  public ack: boolean = false;

  @belongsTo(() => AccountModel, { foreignKey: 'accountIban' })
  public account: BelongsTo<typeof AccountModel>;

  @column.dateTime({ columnName: 'bookingDate', serializeAs: 'bookingDate' })
  public bookingDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
