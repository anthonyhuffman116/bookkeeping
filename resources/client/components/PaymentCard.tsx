import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../Utils';
import Amount from './Amount';

type PaymentCardProps = {
  incomingPayment: IncomingPayment;
  onSetupRegular: (payment: IncomingPayment) => void;
  onApply: (payment: IncomingPayment) => void;
};

export default function PaymentCard(props: PaymentCardProps) {
  const additionalInformation = [
    props.incomingPayment.name,
    props.incomingPayment.account,
    formatDate(props.incomingPayment.bookingDate),
  ];

  const additional = additionalInformation.filter((x) => x != '');

  const handleSetupRegular = () => {
    props.onSetupRegular(props.incomingPayment);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {additional.join(' · ')}
        </Typography>
        <Typography variant="h6" component="div">
          {props.incomingPayment.summary}
        </Typography>

        <Amount amount={props.incomingPayment.amount / 100} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onApply(props.incomingPayment)}>
          Apply
        </Button>
        <Button size="small" onClick={handleSetupRegular}>
          Setup regular
        </Button>
      </CardActions>
    </Card>
  );
}
