import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';
import AmountChip from '../atoms/AmountChip';
import IsFetching from '../atoms/IsFetching';
import Empty from '../molecules/Empty';

type ReportForecastProps = {
  isFetching: boolean;
  categories: CategoryBudget[];
};

const sumTotal = (s: number, item: CategoryBudget, _a, _b) => {
  return s + item.expectedAmount;
};

const sumRemaining = (s: number, item: CategoryBudget, _a, _b) => {
  return s + (item.remaining ?? 0);
};

const sumFilteredBy = (
  categories: CategoryBudget[],
  expression: (x: CategoryBudget) => unknown,
  sum: (s: number, item: CategoryBudget, _a, _b) => number
): number => {
  return categories.filter(expression).reduce<number>(sum, 0);
};

export default function ReportForecast(props: ReportForecastProps) {
  const filtered = props.categories.filter((x) => x.remaining && x.remaining < 0);

  filtered.forEach((c) => {
    console.log(c.summary, c.remaining);
  });

  const expensesTotal = sumFilteredBy(props.categories, (x) => x.expectedAmount < 0, sumTotal);
  const earningsTotal = sumFilteredBy(props.categories, (x) => x.expectedAmount > 0, sumTotal);
  const expensesRemaining = sumFilteredBy(
    props.categories,
    (x) => x.remaining && x.remaining < 0,
    sumRemaining
  );
  const earningsRemainig = sumFilteredBy(
    props.categories,
    (x) => x.remaining && x.remaining > 0,
    sumRemaining
  );

  return (
    <IsFetching isFetching={props.isFetching}>
      <Empty items={props.categories} text="There is not enough data to calculate a forecast yet.">
        <TableContainer component={Paper}>
          <Table aria-label="report">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Earnings</TableCell>
                <TableCell>Expenses</TableCell>
                <TableCell>Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Expected</TableCell>
                <TableCell align="right">
                  <AmountChip amount={earningsTotal / 100} />
                </TableCell>
                <TableCell align="right">
                  <AmountChip amount={expensesTotal / 100} />
                </TableCell>
                <TableCell align="right">
                  <AmountChip amount={(expensesTotal + earningsTotal) / 100} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Remaing</TableCell>
                <TableCell align="right">
                  <AmountChip amount={earningsRemainig / 100} />
                </TableCell>
                <TableCell align="right">
                  <AmountChip amount={expensesRemaining / 100} />
                </TableCell>
                <TableCell align="right">
                  <AmountChip amount={(expensesRemaining + earningsRemainig) / 100} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Empty>
    </IsFetching>
  );
}
