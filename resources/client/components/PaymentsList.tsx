import { CircularProgress, Stack, Container } from '@mui/material';
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

const applyIncomingPayment = (incomingPayment: IncomingPayment) => {
  return fetch('/transactions/' + incomingPayment.id + '/ack', { method: 'POST' });
};

type PaymentsListProps = {
  onRegularCreated: (regular: Regular) => void;
};

export default function PaymentsList(props: PaymentsListProps) {
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [incomingPayments, setIncomingPayments] = useState<IncomingPayment[]>([]);
  const [incomingPaymentToSetupRegular, setIncomingPaymentToSetupRegular] =
    useState<null | IncomingPayment>(null);

  useEffect(() => {
    setIsFetching(true);
    loadTransactions().then((data) => {
      setIncomingPayments(data);
      setIsFetching(false);
    });
  }, []);

  const handleApply = (payment: IncomingPayment): void => {
    applyIncomingPayment(payment).then(() => {
      setIncomingPayments(incomingPayments.filter((p) => p.id != payment.id));
    });
  };

  const handleSetupRegular = (payment: IncomingPayment): void => {
    setIncomingPaymentToSetupRegular(payment);
  };

  const handleCloseSetupRegular = () => {
    setIncomingPaymentToSetupRegular(null);
  };

  const handleSubmitSetupIntervalModal = (regular: Regular) => {
    applyRegular(regular).then(() => {
      props.onRegularCreated(regular);
      setIncomingPaymentToSetupRegular(null);
    });
  };

  let contents = (
    <Container fixed>
      <CircularProgress />
    </Container>
  );

  if (!isFetching) {
    contents = (
      <>
        <SetupIntervalModal
          onSubmit={handleSubmitSetupIntervalModal}
          onClose={handleCloseSetupRegular}
          incomingPayment={incomingPaymentToSetupRegular}
        />
        <Stack spacing={1}>
          {incomingPayments.map((payment: IncomingPayment) => (
            <PaymentCard
              incomingPayment={payment}
              key={payment.id}
              onApply={handleApply}
              onSetupRegular={handleSetupRegular}
            />
          ))}
        </Stack>
      </>
    );
  }

  return contents;
}
