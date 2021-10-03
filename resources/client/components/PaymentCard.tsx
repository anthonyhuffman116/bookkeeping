import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../Utils';
import Amount from './Amount';

type PaymentCardProps = {
  payment: Payment;
  onSetupRegular: (payment: Payment) => void;
  onAck: (payment: Payment) => void;
};

export default function PaymentCard(props: PaymentCardProps) {
  const additionalInformation = [
    props.payment.name,
    props.payment.account,
    formatDate(props.payment.bookingDate),
  ];

  const additional = additionalInformation.filter((x) => x != '');

  const handleSetupRegular = () => {
    props.onSetupRegular(props.payment);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {additional.join(' · ')}
        </Typography>
        <Typography variant="h6" component="div">
          {props.payment.summary}
        </Typography>

        <Amount amount={props.payment.amount / 100} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onAck(props.payment)}>
          ACK
        </Button>
        <Button size="small" onClick={handleSetupRegular}>
          Setup regular
        </Button>
      </CardActions>
    </Card>
  );
}
