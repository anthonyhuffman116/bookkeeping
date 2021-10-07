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

type ReportForecastProps = {
  isFetching: boolean;
  categories: CategoryBudget[];
};

const sumRemaining = (s: number, item: CategoryBudget, _a, _b) => {
  return s + (item.remaining ?? 0);
};

const sumFilteredBy = (
  categories: CategoryBudget[],
  expression: (x: CategoryBudget) => unknown
): number => {
  return categories.filter(expression).reduce<number>(sumRemaining, 0);
};

export default function ReportForecast(props: ReportForecastProps) {
  const expenses = sumFilteredBy(props.categories, (x) => x.remaining && x.remaining < 0);
  const earnings = sumFilteredBy(props.categories, (x) => x.remaining && x.remaining > 0);

  return (
    <IsFetching isFetching={props.isFetching}>
      <TableContainer component={Paper}>
        <Table aria-label="report">
          <TableHead>
            <TableRow>
              <TableCell>Earnings</TableCell>
              <TableCell>Expenses</TableCell>
              <TableCell>Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <AmountChip amount={earnings / 100} />
              </TableCell>
              <TableCell>
                <AmountChip amount={expenses / 100} />
              </TableCell>
              <TableCell>
                <AmountChip amount={(expenses + earnings) / 100} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </IsFetching>
  );
}
