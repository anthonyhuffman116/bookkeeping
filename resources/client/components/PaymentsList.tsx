import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentCard from './PaymentCard';
import SetupIntervalModal from './SetupRegularModal';

const mapToTransactions = (data: any) => {
  let x = data;
  x.bookingDate = new Date(x.bookingDate);

  return x;
};

const loadTransactions = () => {
  return fetch('/transactions')
    .then((response) => response.json())
    .then((data) => {
      return data.map((x) => mapToTransactions(x));
    });
};

const applyRegular = (regular: Regular) => {
  return fetch('/regulars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(regular),
  });
};

const ackPayment = (payment: Payment) => {
  return fetch('/transactions/' + payment.id + '/ack', { method: 'POST' });
};

type PaymentsListProps = {
  onRegularCreated: (regular: Regular) => void;
};

export default function PaymentsList(props: PaymentsListProps) {
  const [_, setIsFetching] = useState<Boolean>(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentToSetupRegular, setPaymentToSetupRegular] = useState<null | Payment>(null);

  useEffect(() => {
    setIsFetching(true);
    loadTransactions().then((data) => {
      setPayments(data);
      setIsFetching(false);
    });
  }, []);

  const handleAck = (payment: Payment): void => {
    ackPayment(payment).then(() => {
      setPayments(payments.filter((p) => p.id != payment.id));
    });
  };

  const handleSetupRegular = (payment: Payment): void => {
    setPaymentToSetupRegular(payment);
  };

  const handleCloseSetupRegular = () => {
    setPaymentToSetupRegular(null);
  };

  const handleSubmitSetupIntervalModal = (regular: Regular) => {
    applyRegular(regular).then(() => {
      props.onRegularCreated(regular);
      setPaymentToSetupRegular(null);
    });
  };

  return (
    <>
      <SetupIntervalModal
        onSubmit={handleSubmitSetupIntervalModal}
        onClose={handleCloseSetupRegular}
        payment={paymentToSetupRegular}
      />
      <Stack spacing={1}>
        {payments.map((payment: Payment) => (
          <PaymentCard
            payment={payment}
            key={payment.id}
            onAck={handleAck}
            onSetupRegular={handleSetupRegular}
          />
        ))}
      </Stack>
    </>
  );
}
