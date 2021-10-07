import { Chip } from '@mui/material';
import React from 'react';

type AmountChipProps = {
  amount: number;
  size?: 'small' | 'medium' | undefined;
  format?: Intl.NumberFormat;
  hidePrefix?: boolean;
};

export default function AmountChip(props: AmountChipProps) {
  const format =
    props.format ?? Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'EUR' });
  const size = props.size ?? 'small';

  let color: any = 'default';
  let label = format.format(props.amount);

  if (props.amount > 0) {
    color = 'success';
  } else if (props.amount < 0) {
    color = 'error';
  }

  if (props.amount > 0 && !props.hidePrefix) {
    label = '+' + label;
  }

  return <Chip label={label} color={color} size={size} />;
}
