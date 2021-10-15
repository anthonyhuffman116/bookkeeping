import { TableRow, TableCell, Stack } from '@mui/material';
import AmountChip from '../atoms/AmountChip';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import React from 'react';
import CircularProgressWithLabel from '../molecules/CircularProgressWithLabel';
import CategoryBudget from 'resources/client/interfaces/CategoryBudget';

type ReportByCategoryItemProps = {
  item: CategoryBudget;
};

export default function ReportByCategoryItem(props: ReportByCategoryItemProps) {
  let contents: any = null;

  if (props.item.expectedAmount == props.item.amount) {
    contents = <CheckIcon />;
  } else if (props.item.remaining == null) {
    contents = (
      <Stack direction="row" justifyContent="space-between">
        <WarningIcon />
        <AmountChip amount={0} />
      </Stack>
    );
  } else {
    contents = <AmountChip amount={props.item.remaining / 100} />;
  }

  return (
    <TableRow key={props.item.id}>
      <TableCell>{props.item.summary}</TableCell>
      <TableCell align="right">
        <AmountChip amount={props.item.expectedAmount / 100} />
      </TableCell>
      <TableCell align="right">
        <AmountChip amount={(props.item.amount ?? 0) / 100} />
      </TableCell>
      <TableCell align="right">{contents}</TableCell>
      <TableCell>
        <CircularProgressWithLabel value={props.item.percentage ?? 0.0} />
      </TableCell>
    </TableRow>
  );
}
