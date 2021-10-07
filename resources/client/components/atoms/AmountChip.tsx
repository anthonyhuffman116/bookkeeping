import { Chip } from '@mui/material';
import React from 'react';

type AmountChipProps = {
  amount: number;
  size?: 'small' | 'medium' | undefined;
  format?: Intl.NumberFormat;
};

export default function AmountChip(props: AmountChipProps) {
  const format = props.format ?? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  const size = props.size ?? 'small';

  let color: any = 'default';

  if (props.amount > 0) {
    color = 'success';
  } else if (props.amount < 0) {
    color = 'error';
  }

  return <Chip label={format.format(props.amount)} color={color} size={size} />;
}
