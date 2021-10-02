import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PaymentCard from './PaymentCard';

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

export default function PaymentsList() {
  const [_, setIsFetching] = useState<Boolean>(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    setIsFetching(true);
    loadTransactions().then((data) => {
      setPayments(data);
      setIsFetching(false);
    });
  }, []);

  return (
    <Stack spacing={2}>
      {payments.map((payment: Payment) => (
        <PaymentCard payment={payment} key={payment.id} />
      ))}
    </Stack>
  );
}
