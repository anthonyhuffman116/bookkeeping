import React from 'react';
import CategoriesList from '../templates/CategoriesList';
import IsFetching from '../atoms/IsFetching';
import PageRoot from '../atoms/PageRoot';
import Category from 'resources/client/interfaces/Category';
import { useQuery } from 'react-query';
import { useFetch } from '../../Utils';

const loadCategories = () => {
  return useFetch<Category[]>('/categories').then((data) =>
    data.map((x) => ({
      ...x,
      dueDate: x.dueDate ? new Date(x.dueDate) : null,
    }))
  );
};

export default function CategoriesPage() {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery<Category[], Error>('categories', loadCategories);

  return (
    <PageRoot>
      <h1>Categories</h1>
      <IsFetching isFetching={isLoading} error={error}>
        <CategoriesList categories={categories!!} />
      </IsFetching>
    </PageRoot>
  );
}
