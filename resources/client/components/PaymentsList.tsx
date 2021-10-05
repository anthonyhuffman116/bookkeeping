import { CircularProgress, Stack, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApplyIncomingPaymentModal from './ApplyIncomingPayment';
import PaymentCard from './PaymentCard';
import SetupIntervalModal from './SetupCategoryModal';

const mapToIncomingPayment = (data: any) => {
  let x = data;
  x.bookingDate = new Date(x.bookingDate);

  return x;
};

const loadIncomingPayments = () => {
  return fetch('/incoming-payments')
    .then((response) => response.json())
    .then((data) => {
      return data.map((x) => mapToIncomingPayment(x));
    });
};

const applyCategory = (category: Category) => {
  return fetch('/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
};

const applyPayment = (payment: Payment) => {
  return fetch('/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });
};

type PaymentsListProps = {
  onCategoryCreated: (category: Category) => void;
  onPaymentApplied: (payment: Payment) => void;
  categories: Category[];
};

export default function PaymentsList(props: PaymentsListProps) {
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [incomingPayments, setIncomingPayments] = useState<IncomingPayment[]>([]);
  const [incomingPaymentToSetupCategory, setIncomingPaymentToSetupCategory] =
    useState<null | IncomingPayment>(null);
  const [incomingPaymentToApply, setIncomingPaymentToApply] = useState<null | IncomingPayment>(
    null
  );

  useEffect(() => {
    setIsFetching(true);
    loadIncomingPayments().then((data) => {
      setIncomingPayments(data);
      setIsFetching(false);
    });
  }, []);

  const handleCloseApply = () => {
    setIncomingPaymentToApply(null);
  };

  const handleApply = (incomingPayment: IncomingPayment): void => {
    setIncomingPaymentToApply(incomingPayment);
  };

  const handleSubmitApply = (payment: Payment) => {
    applyPayment(payment).then(() => {
      props.onPaymentApplied(payment);
      setIncomingPayments(incomingPayments.filter((x) => x.id != incomingPaymentToApply?.id));
      setIncomingPaymentToApply(null);
    });
  };

  const handleSetupCategory = (incomingPayment: IncomingPayment): void => {
    setIncomingPaymentToSetupCategory(incomingPayment);
  };

  const handleCloseSetupCategory = () => {
    setIncomingPaymentToSetupCategory(null);
  };

  const handleSubmitSetupIntervalModal = (category: Category) => {
    applyCategory(category).then(() => {
      props.onCategoryCreated(category);
      setIncomingPaymentToSetupCategory(null);
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
          onClose={handleCloseSetupCategory}
          incomingPayment={incomingPaymentToSetupCategory}
        />
        <ApplyIncomingPaymentModal
          onSubmit={handleSubmitApply}
          onClose={handleCloseApply}
          incomingPayment={incomingPaymentToApply}
          categories={props.categories}
        />
        <Stack spacing={1}>
          {incomingPayments.map((payment: IncomingPayment) => (
            <PaymentCard
              incomingPayment={payment}
              key={payment.id}
              onApply={handleApply}
              onSetupCategory={handleSetupCategory}
            />
          ))}
        </Stack>
      </>
    );
  }

  return contents;
}
