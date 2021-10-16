import { Button } from '@mui/material';
import React from 'react';
import { usePostFetch } from '../../Utils';
import { format } from 'date-fns';

const f = (date: Date) => {
  return usePostFetch<null>(`/close-month/${format(date, 'yyyy-MM')}`, {});
};

type WrapUpMonthProps = {
  onWrappedUp: () => void;
  date: Date;
};

export default function WrapUpMonth(props: WrapUpMonthProps) {
  const handleClick = () => {
    if (
      confirm(
        `This will wrap up the month of ${format(
          props.date,
          'LLL. yyyy'
        )} and you will no longer be able to add payments to it. Are you sure?`
      )
    ) {
      f(props.date).then(props.onWrappedUp);
    }
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Wrap up {format(props.date, 'LLL. yyyy')}
    </Button>
  );
}
