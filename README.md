# bookkeeping

This is my bookkeeping application.

## Running it

```sh
npm run build
```

and deploy the build folder to your production environment and run `node server.js` from it.

If you want to use FinTS to automatically import transactions from your accounts, add a _cronjob_ and run the following:

```sh
node ace fints
```

## Development

```
npm run dev
```
