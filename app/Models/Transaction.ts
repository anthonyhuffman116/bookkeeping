import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Transaction extends BaseModel {
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

  @belongsTo(() => Account, { foreignKey: 'accountIban' })
  public account: BelongsTo<typeof Account>;

  @column.dateTime({ columnName: 'bookingDate', serializeAs: 'bookingDate' })
  public bookingDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
