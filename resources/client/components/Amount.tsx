import { Chip } from '@mui/material';
import React from 'react';

type AmountProps = {
  amount: number;
  size?: 'small' | 'medium' | undefined;
};

export default function Amount(props: AmountProps) {
  const size = props.size ?? 'small';
  const color = props.amount > 0 ? 'success' : 'error';

  return <Chip label={props.amount.toFixed(2) + ' €'} color={color} size={size} />;
}
