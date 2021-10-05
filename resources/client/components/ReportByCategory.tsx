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
import Amount from './Amount';
import IsFetching from './IsFetching';

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

type ReportByCategoryProps = {};

export default function ReportByCategory(_: ReportByCategoryProps) {
  const [report, setReport] = useState<ReportCategories[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
    loadReport(new Date('2021-10-01'), new Date('2021-10-31')).then((x) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.summary}</TableCell>
                <TableCell align="right">
                  <Amount amount={row.expectedAmount / 100} />
                </TableCell>
                <TableCell align="right">
                  <Amount amount={(row.amount ?? 0.0) / 100} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IsFetching>
  );
}
