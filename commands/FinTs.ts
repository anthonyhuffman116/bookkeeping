import { BaseCommand } from '@adonisjs/core/build/standalone';
import Database from '@ioc:Adonis/Lucid/Database';
import { PinTanClient, SEPAAccount, Statement, Transaction } from 'fints';

function removeTimeFromDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

type InsertResult = {
  rowCount: number;
};

export default class FinTs extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fints';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'fetch input data from FinTS servers';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  };

  public async run() {
    const now = new Date();
    const endDate = now;
    const startDate = new Date();
    startDate.setDate(now.getDate() - 1);

    const client = new PinTanClient({
      url: process.env.FINTS_URL!!,
      name: process.env.FINTS_NAME!!,
      pin: process.env.FINTS_PIN!!,
      blz: process.env.FINTS_BLZ!!,
      productId: process.env.FINTS_PRODUCT_ID!!,
    });

    const accounts: SEPAAccount[] = await client.accounts();

    await Promise.all(
      accounts.map(async (account: SEPAAccount) => {
        const transactions = await this.getTransactions(client, account, startDate, endDate);
        const affected = await Promise.all(this.insertIntoDatabase(account, transactions));
        const rowCount = affected.reduce<number>((a, x) => a + x.rowCount, 0);

        // TODO: report newly transmitted transactions to Discord also
        console.log(`import completed: ${rowCount} transactions processed for ${account.iban}`);
      })
    );

    await this.exit();
  }

  private async getTransactions(
    client: PinTanClient,
    account: SEPAAccount,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const statements = await client.statements(account, startDate, endDate);
    return statements.map((s: Statement) => s.transactions).flat();
  }

  private insertIntoDatabase(
    account: SEPAAccount,
    transactions: Transaction[]
  ): Promise<InsertResult>[] {
    return transactions.map((t: Transaction) => {
      const bookingDate: Date = removeTimeFromDate(new Date(t.valueDate));
      const summary = t.descriptionStructured?.reference.text ?? '';
      const amount = Math.ceil((t.isCredit ? t.amount : t.amount * -1) * 100);

      return Database.rawQuery<InsertResult>(
        `INSERT INTO transactions ("bookingDate", name, summary, amount, account, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT ON CONSTRAINT transactions_unique DO NOTHING`,
        [
          bookingDate,
          t.descriptionStructured?.name ?? '',
          summary,
          amount,
          account.iban,
          new Date(),
          new Date(),
        ]
      ).exec();
    });
  }
}
