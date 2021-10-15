import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Balance extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ columnName: 'bookingDate', serializeAs: 'bookingDate' })
  public bookingDate: DateTime;

  @column({ columnName: 'account', serializeAs: 'accountIban' })
  public accountIban: string;

  @column()
  public amount: number;

  @belongsTo(() => Account, { foreignKey: 'accountIban' })
  public account: BelongsTo<typeof Account>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
