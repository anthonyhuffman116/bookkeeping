import { Card, Typography, Grid, Divider, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatDate, useFetch } from '../Utils';
import Amount from './Amount';
import IsFetching from './IsFetching';

const loadReport = () => {
  return useFetch<Balance[]>('/reports/balances').then((data) =>
    data.map((x) => ({
      ...x,
      bookingDate: new Date(x.bookingDate),
    }))
  );
};

type ReportBalancesProps = {};

export default function ReportBalances(_props: ReportBalancesProps) {
  const [report, setReport] = useState<Balance[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
    loadReport().then((x) => {
      setReport(x);
      setIsFetching(false);
    });
  }, []);

  return (
    <IsFetching isFetching={isFetching}>
      <Card sx={{ padding: '10px' }}>
        {report.map((balance) => (
          <Box key={balance.iban}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                  {balance.iban} · {formatDate(balance.bookingDate)}
                </Typography>

                <Typography variant="h6" component="div">
                  {balance.account ?? '-'}
                </Typography>
              </Grid>
              <Grid item>
                <Amount amount={balance.amount / 100} />
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
      </Card>
    </IsFetching>
  );
}
