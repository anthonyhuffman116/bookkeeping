import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentsList from '../templates/PaymentsList';
import { beginOfMonth, endOfMonth, useFetch } from '../../Utils';
import ReportByCategory from '../templates/ReportByCategory';
import ReportBalances from '../templates/ReportBalances';

const loadCategories = () => {
  return useFetch<Category[]>('/categories').then((data) =>
    data.map((x) => ({ ...x, dueDate: x.dueDate ? new Date(x.dueDate) : null }))
  );
};

export default function DashboardPage() {
  const from = beginOfMonth(new Date());
  const to = endOfMonth(new Date());
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleCategoryCreated = (category: Category) => {
    setCategories([category, ...categories]);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack>
            <h2>New payments</h2>
            <PaymentsList
              onCategoryCreated={handleCategoryCreated}
              onPaymentApplied={(_payment: Payment) => {}}
              categories={categories}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <Stack>
              <h2>Balances</h2>
              <ReportBalances />
            </Stack>
            <Stack>
              <h2>Budget</h2>
              <ReportByCategory from={from} to={to} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
