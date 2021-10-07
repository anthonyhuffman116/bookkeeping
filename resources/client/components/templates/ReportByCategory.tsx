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
import IsFetching from '../atoms/IsFetching';
import ReportByCategoryItem from './ReportByCategoryItem';

type ReportByCategoryProps = {
  from: Date;
  to: Date;
  isFetching: boolean;
  categories: ReportCategories[];
};

export default function ReportByCategory(props: ReportByCategoryProps) {
  return (
    <IsFetching isFetching={props.isFetching}>
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
            {props.categories.map((row) => (
              <ReportByCategoryItem key={row.id} item={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IsFetching>
  );
}
