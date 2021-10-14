import { Button, Grid, Stack } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';
import IncomingPaymentsList from '../templates/IncomingPaymentsList';
import { beginOfMonth, endOfMonth, formatDate, useFetch } from '../../Utils';
import ReportByCategory from '../templates/ReportByCategory';
import ReportBalances from '../templates/ReportBalances';
import ReportForecast from '../templates/ReportForecast';
import { calculateBudget } from '../../CategoryBudget';
import { Link } from 'react-router-dom';
import PageRoot from '../atoms/PageRoot';
import BalancesGraph from '../templates/BalancesGraph';

export const CategoryBudgetContext = createContext<CategoryBudget[]>([]);

const loadCategories = () => {
  return useFetch<Category[]>('/categories').then((data) =>
    data.map((x) => ({ ...x, dueDate: x.dueDate ? new Date(x.dueDate) : null }))
  );
};

const loadBalances = () => {
  return useFetch<Balance[]>('/balances').then((data) =>
    data.map((x) => ({ ...x, bookingDate: new Date(x.bookingDate) }))
  );
};

const loadReportCategories = (from: Date, to: Date) => {
  return useFetch<CategoryBudget[]>('/reports/' + formatDate(from) + '/' + formatDate(to)).then(
    (data) =>
      calculateBudget(
        data.map((x) => ({
          ...x,
          amount: x.amount != null ? parseInt(x.amount?.toString()) : null,
          expectedAmount: parseInt(x.expectedAmount.toString()),
          dueDate: x.dueDate != null ? new Date(x.dueDate) : null,
        }))
      )
  );
};

export default function DashboardPage() {
  const from = beginOfMonth(new Date());
  const to = endOfMonth(new Date());

  const d = new Date();
  d.setMonth(d.getMonth() - 12);
  const balancesGraphStartDate = beginOfMonth(d);

  const [categories, setCategories] = useState<Category[]>([]);

  const [isFetchingReportCategories, setIsFetchingReportCategories] = useState<boolean>(true);
  const [reportCategories, setReportCategories] = useState<CategoryBudget[]>([]);

  const [isFetchingBalances, setIsFetchingBalances] = useState<boolean>(true);
  const [balances, setBalances] = useState<Balance[]>([]);

  const refreshCategories = () => {
    loadCategories().then((data) => {
      setCategories(data);
    });
  };

  const refreshReportCategories = () => {
    setIsFetchingReportCategories(true);

    loadReportCategories(from, to).then((x) => {
      setReportCategories(x);
      setIsFetchingReportCategories(false);
    });
  };

  const refreshBalances = () => {
    setIsFetchingBalances(true);

    loadBalances().then((x) => {
      setBalances(x);
      setIsFetchingBalances(false);
    });
  };

  useEffect(() => {
    refreshCategories();
    refreshReportCategories();
    refreshBalances();
  }, []);

  const handleCategoryCreated = (category: Category) => {
    setCategories([category, ...categories]);
  };

  const handleIncomingPaymentApplied = (payment: Payment) => {
    const index = reportCategories.findIndex((b) => b.id === payment.categoryId);

    if (index === -1) {
      refreshReportCategories();
      return;
    }

    const categoryBudget = reportCategories[index];

    const newCategoryBudget: CategoryBudget = {
      ...categoryBudget,
      amount: (categoryBudget.amount ?? 0.0) + payment.amount,
    };

    const oldItems = reportCategories.filter((i) => i.id !== payment.categoryId);
    const newItems = calculateBudget([...oldItems, newCategoryBudget]);

    newItems.sort((a, b) => (a.summary.toLowerCase() > b.summary.toLowerCase() ? 0 : -1));

    setReportCategories(newItems);
  };

  return (
    <PageRoot>
      <CategoryBudgetContext.Provider value={reportCategories}>
        <h1>Dashboard</h1>

        <Grid container spacing={2}>
          <Grid item md={12} lg={6}>
            <Stack>
              <h2>Balances</h2>
              <BalancesGraph
                isFetching={isFetchingBalances}
                balances={balances}
                startDate={balancesGraphStartDate}
              />
            </Stack>
            <Stack>
              <Stack direction="row" justifyContent="space-between" alignContent="baseline">
                <h2>New payments</h2>
                <Button component={Link} to="/payments" variant="text">
                  see all payments
                </Button>
              </Stack>

              <IncomingPaymentsList
                onCategoryCreated={handleCategoryCreated}
                onIncomingPaymentApplied={handleIncomingPaymentApplied}
                categories={categories}
              />
            </Stack>
            <Stack>
              <Stack direction="row" justifyContent="space-between" alignContent="baseline">
                <h2>Budget</h2>
                <Button component={Link} to="/categories" variant="text">
                  setup categories
                </Button>
              </Stack>

              <ReportByCategory isFetching={isFetchingReportCategories} />
            </Stack>
          </Grid>
          <Grid item md={12} lg={6}>
            <Stack>
              <Stack>
                <h2>Balances</h2>
                <ReportBalances />
              </Stack>
              <Stack>
                <h2>Forecast</h2>
                <ReportForecast isFetching={isFetchingReportCategories} />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CategoryBudgetContext.Provider>
    </PageRoot>
  );
}
