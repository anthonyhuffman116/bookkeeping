import { Stack } from '@mui/material';
import React from 'react';
import Empty from '../molecules/Empty';
import IsFetching from '../atoms/IsFetching';
import PaymentCard from './PaymentCard';

type PaymentsListProps = {
  isFetching: boolean;
  payments: AppliedPayment[];
};

export default function IncomingPaymentsList(props: PaymentsListProps) {
  return (
    <IsFetching isFetching={props.isFetching}>
      <Empty items={props.payments} text="There are no payments.">
        <Stack spacing={1}>
          {props.payments.map((payment: AppliedPayment) => (
            <PaymentCard payment={payment} />
          ))}
        </Stack>
      </Empty>
    </IsFetching>
  );
}
