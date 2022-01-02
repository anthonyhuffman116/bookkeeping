import { Stack } from '@mui/material';
import React from 'react';
import Empty from '../molecules/Empty';
import PaymentCard from './PaymentCard';
import { AppliedPayment } from 'resources/client/interfaces/Payment';

type PaymentsListProps = {
  payments: AppliedPayment[];
};

export default function IncomingPaymentsList(props: PaymentsListProps) {
  return (
    <Empty items={props.payments} text="There are no payments.">
      <Stack spacing={1}>
        {props.payments.map((payment: AppliedPayment) => (
          <PaymentCard payment={payment} key={payment.id} />
        ))}
      </Stack>
    </Empty>
  );
}
