import React, { useState, useEffect } from 'react';
import { useFetch } from '../../Utils';
import IsFetching from '../atoms/IsFetching';
import PageRoot from '../atoms/PageRoot';
import PaymentsList from '../templates/PaymentsList';

const loadPayments = () => {
  return useFetch<AppliedPayment[]>('/payments').then((data) =>
    data.map((x) => ({ ...x, bookingDate: new Date(x.bookingDate) }))
  );
};

export default function PaymentsPage() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [payments, setPayments] = useState<AppliedPayment[]>([]);

  useEffect(() => {
    setIsFetching(true);
    loadPayments().then((data) => {
      setPayments(data);
      setIsFetching(false);
    });
  }, []);

  return (
    <PageRoot>
      <h1>Payments</h1>
      <IsFetching isFetching={isFetching}>
        <PaymentsList isFetching={isFetching} payments={payments} />
      </IsFetching>
    </PageRoot>
  );
}
