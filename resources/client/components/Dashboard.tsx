import { Grid } from '@mui/material';
import React from 'react';
import PaymentsList from './PaymentsList';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PaymentsList />
        </Grid>
        <Grid item xs={6}>
          B
        </Grid>
      </Grid>
    </div>
  );
}
