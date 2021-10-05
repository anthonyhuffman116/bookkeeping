import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../Utils';
import CategoriesList from './CategoriesList';
import IsFetching from './IsFetching';

const loadCategories = () => {
  return useFetch<Category[]>('/categories').then((data) =>
    data.map((x) => ({ ...x, dueDate: x.dueDate ? new Date(x.dueDate) : null }))
  );
};

export default function CategoriesPage() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setIsFetching(true);
    loadCategories().then((data) => {
      setCategories(data);
      setIsFetching(false);
    });
  }, []);

  return (
    <Container>
      <h1>Categories</h1>
      <IsFetching isFetching={isFetching}>
        <CategoriesList isFetching={isFetching} categories={categories} />
      </IsFetching>
    </Container>
  );
}
