import { Chip } from '@mui/material';
import React from 'react';

type AmountProps = {
  amount: number;
  size?: 'small' | 'medium' | undefined;
};

export default function Amount(props: AmountProps) {
  const size = props.size ?? 'small';

  let color: any = 'default';

  if (props.amount > 0) {
    color = 'success';
  } else if (props.amount < 0) {
    color = 'error';
  }

  return <Chip label={props.amount.toFixed(2) + ' €'} color={color} size={size} />;
}
