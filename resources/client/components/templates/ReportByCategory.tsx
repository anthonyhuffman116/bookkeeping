import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React, { useContext } from 'react';
import IsFetching from '../atoms/IsFetching';
import Empty from '../molecules/Empty';
import { CategoryBudgetContext } from '../pages/DashboardPage';
import ReportByCategoryItem from './ReportByCategoryItem';

type ReportByCategoryProps = {
  isFetching: boolean;
};

export default function ReportByCategory(props: ReportByCategoryProps) {
  const categoryBudgets = useContext<CategoryBudget[]>(CategoryBudgetContext);

  return (
    <IsFetching isFetching={props.isFetching}>
      <Empty items={categoryBudgets} text="There is not enough data to calculate budgets yet.">
        <TableContainer component={Paper}>
          <Table aria-label="report">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Expected</TableCell>
                <TableCell>Actual</TableCell>
                <TableCell>Remaining</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryBudgets.map((row) => (
                <ReportByCategoryItem key={row.id} item={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Empty>
    </IsFetching>
  );
}
