import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import AccountModel from './AccountModel';

export default class BalanceModel extends BaseModel {
  public static table = 'balances';

  @column({ isPrimary: true })
  public id: string;

  @column({ columnName: 'bookingDate', serializeAs: 'bookingDate' })
  public bookingDate: DateTime;

  @column({ columnName: 'account', serializeAs: 'accountIban' })
  public accountIban: string;

  @column()
  public amount: number;

  @belongsTo(() => AccountModel, { foreignKey: 'accountIban' })
  public account: BelongsTo<typeof AccountModel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
