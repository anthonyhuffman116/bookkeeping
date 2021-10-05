import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentsList from './PaymentsList';
import { useFetch } from '../Utils';
import ReportByCategory from './ReportByCategory';

const loadCategories = () => {
  return useFetch<Category[]>('/categories').then((data) =>
    data.map((x) => ({ ...x, dueDate: x.dueDate ? new Date(x.dueDate) : null }))
  );
};

export default function Dashboard() {
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
        <Grid item xs={6}>
          <PaymentsList
            onCategoryCreated={handleCategoryCreated}
            onPaymentApplied={(_payment: Payment) => {}}
            categories={categories}
          />
        </Grid>
        <Grid item xs={6}>
          <ReportByCategory />
        </Grid>
      </Grid>
    </div>
  );
}
