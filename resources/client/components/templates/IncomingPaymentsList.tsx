import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFetch, usePostFetch } from '../../Utils';
import Empty from '../molecules/Empty';
import IsFetching from '../atoms/IsFetching';
import ApplyIncomingPaymentModal from './ApplyIncomingPaymentModal';
import IncomingPaymentCard from './IncomingPaymentCard';
import SetupIntervalModal from './SetupCategoryModal';
import IncomingPayment from 'resources/client/interfaces/IncomingPayment';
import Category from 'resources/client/interfaces/Category';
import Payment from 'resources/client/interfaces/Payment';

const loadIncomingPayments = () => {
  return useFetch<IncomingPayment[]>('/incoming-payments').then((data) =>
    data.map((x) => ({ ...x, bookingDate: new Date(x.bookingDate) }))
  );
};

const applyCategory = (category: Category) => {
  return usePostFetch('/categories', category);
};

const applyPayment = (payment: Payment) => {
  return usePostFetch('/payments', payment);
};

type IncomingPaymentsListProps = {
  onCategoryCreated: (category: Category) => void;
  onIncomingPaymentApplied: (payment: Payment) => void;
  categories: Category[];
};

export default function IncomingPaymentsList(props: IncomingPaymentsListProps) {
  const [isFetching, setIsFetching] = useState<boolean>(true);
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
      props.onIncomingPaymentApplied(payment);
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

  return (
    <IsFetching isFetching={isFetching}>
      <Empty items={incomingPayments} text="There are no new payments.">
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
            <IncomingPaymentCard
              incomingPayment={payment}
              key={payment.id}
              onApply={handleApply}
              onSetupCategory={handleSetupCategory}
            />
          ))}
        </Stack>
      </Empty>
    </IsFetching>
  );
}
