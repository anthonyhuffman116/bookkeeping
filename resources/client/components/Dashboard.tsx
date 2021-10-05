import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentsList from './PaymentsList';
import CategoriesList from './CategoriesList';

const mapToCategory = (data: any) => {
  let x = data;
  x.dueDate = x.dueDate ? new Date(x.dueDate) : null;

  return x;
};

const loadCategories = () => {
  return fetch('/categories')
    .then((response) => response.json())
    .then((data) => {
      return data.map((x) => mapToCategory(x));
    });
};

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesIsFetching, setCategoriesIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setCategoriesIsFetching(true);
    loadCategories().then((data) => {
      setCategories(data);
      setCategoriesIsFetching(false);
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
          <CategoriesList isFetching={categoriesIsFetching} categories={categories} />
        </Grid>
      </Grid>
    </div>
  );
}
