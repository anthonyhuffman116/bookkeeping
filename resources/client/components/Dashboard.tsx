import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentsList from './PaymentsList';
import RegularsList from './RegularsList';

const mapToRegular = (data: any) => {
  let x = data;
  x.dueDate = new Date(x.dueDate);

  return x;
};

const loadRegulars = () => {
  return fetch('/regulars')
    .then((response) => response.json())
    .then((data) => {
      return data.map((x) => mapToRegular(x));
    });
};

export default function Dashboard() {
  const [regulars, setRegulars] = useState<Regular[]>([]);
  const [regularsIsFetching, setRegularsIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setRegularsIsFetching(true);
    loadRegulars().then((data) => {
      setRegulars(data);
      setRegularsIsFetching(false);
    });
  }, []);

  const handleRegularCreated = (regular: Regular) => {
    setRegulars([regular, ...regulars]);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PaymentsList onRegularCreated={handleRegularCreated} />
        </Grid>
        <Grid item xs={6}>
          <RegularsList isFetching={regularsIsFetching} regulars={regulars} />
        </Grid>
      </Grid>
    </div>
  );
}
