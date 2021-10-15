import React, { useState, useEffect } from 'react';
import { useFetch } from '../../Utils';
import CategoriesList from '../templates/CategoriesList';
import IsFetching from '../atoms/IsFetching';
import PageRoot from '../atoms/PageRoot';
import Category from 'resources/client/interfaces/Category';

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
    <PageRoot>
      <h1>Categories</h1>
      <IsFetching isFetching={isFetching}>
        <CategoriesList isFetching={isFetching} categories={categories} />
      </IsFetching>
    </PageRoot>
  );
}
