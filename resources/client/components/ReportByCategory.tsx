import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatDate, useFetch } from '../Utils';
import IsFetching from './IsFetching';
import ReportByCategoryItem from './ReportByCategoryItem';

const loadReport = (from: Date, to: Date) => {
  return useFetch<ReportCategories[]>('/reports/' + formatDate(from) + '/' + formatDate(to)).then(
    (data) =>
      data.map((x) => ({
        ...x,
        amount: x.amount != null ? parseInt(x.amount?.toString()) : null,
        expectedAmount: parseInt(x.expectedAmount.toString()),
        dueDate: x.dueDate != null ? new Date(x.dueDate) : null,
      }))
  );
};

type ReportByCategoryProps = {
  from: Date;
  to: Date;
};

export default function ReportByCategory(props: ReportByCategoryProps) {
  const [report, setReport] = useState<ReportCategories[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
    loadReport(props.from, props.to).then((x) => {
      setReport(x);
      setIsFetching(false);
    });
  }, []);

  return (
    <IsFetching isFetching={isFetching}>
      <TableContainer component={Paper}>
        <Table aria-label="report">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Expected</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Current Budget</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row) => (
              <ReportByCategoryItem key={row.id} item={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IsFetching>
  );
}
