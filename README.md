# bookkeeping

This is my bookkeeping application. It is heavily opionated and uses Postgres as a Backend, FinTS to synchronize bank account balances and transactions and Supabase to handle sign ins and auth.

## Running it

```sh
npm run build
```

and deploy the build folder to your production environment and run `node ace migration:run` followed by `node server.js` from it.

If you want to use FinTS to automatically import transactions from your accounts, add a _cronjob_ and run the following:

```sh
node ace fints
```

## Development

```
npm run dev
```
