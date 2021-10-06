import { TableRow, TableCell } from '@mui/material';
import Amount from './Amount';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';

type ReportByCategoryItemProps = {
  item: ReportCategories;
};

export default function ReportByCategoryItem(props: ReportByCategoryItemProps) {
  const actual = (props.item.amount ?? 0.0) / 100;
  const expected = props.item.expectedAmount / 100;
  const remaining = expected - actual;
  let percentage = 0;

  if (expected > 0) {
    percentage = Math.ceil((100 / Math.abs(expected)) * Math.abs(actual));
  }

  return (
    <TableRow key={props.item.id}>
      <TableCell>{props.item.summary}</TableCell>
      <TableCell align="right">
        <Amount amount={expected} />
      </TableCell>
      <TableCell align="right">
        <Amount amount={actual} />
      </TableCell>
      <TableCell align="right">
        {expected == actual ? <CheckIcon /> : <Amount amount={remaining} />}
      </TableCell>
      <TableCell>
        <CircularProgressWithLabel value={percentage} />
      </TableCell>
    </TableRow>
  );
}
