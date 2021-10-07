import { TableRow, TableCell, Stack } from '@mui/material';
import AmountChip from '../atoms/AmountChip';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import React from 'react';
import CircularProgressWithLabel from '../molecules/CircularProgressWithLabel';

type ReportByCategoryItemProps = {
  item: ReportCategories;
};

function diff(expected: number, actual: number): null | number {
  if (expected > 0) {
    // earnings
    return expected + actual;
  } else if (actual < expected) {
    // spendings exceeded
    return null;
  }

  return expected - actual;
}

export default function ReportByCategoryItem(props: ReportByCategoryItemProps) {
  const actual = (props.item.amount ?? 0.0) / 100;
  const expected = props.item.expectedAmount / 100;
  let remaining = diff(expected, actual);
  let percentage = 0;

  if (expected != 0) {
    percentage = Math.ceil((100 / Math.abs(expected)) * Math.abs(actual));
  }

  let contents: any = null;

  if (expected == actual) {
    contents = <CheckIcon />;
  } else if (remaining == null) {
    contents = (
      <Stack direction="row" justifyContent="space-between">
        <WarningIcon />
        <AmountChip amount={0} />
      </Stack>
    );
  } else {
    contents = <AmountChip amount={remaining} />;
  }

  return (
    <TableRow key={props.item.id}>
      <TableCell>{props.item.summary}</TableCell>
      <TableCell align="right">
        <AmountChip amount={expected} />
      </TableCell>
      <TableCell align="right">
        <AmountChip amount={actual} />
      </TableCell>
      <TableCell align="right">{contents}</TableCell>
      <TableCell>
        <CircularProgressWithLabel value={percentage} />
      </TableCell>
    </TableRow>
  );
}
