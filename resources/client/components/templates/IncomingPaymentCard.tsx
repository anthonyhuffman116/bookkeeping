import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../../Utils';
import AmountChip from '../atoms/AmountChip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import IncomingPayment from 'resources/client/interfaces/IncomingPayment';

type IncomingPaymentCardProps = {
  incomingPayment: IncomingPayment;
  onSetupCategory: (payment: IncomingPayment) => void;
  onApply: (payment: IncomingPayment) => void;
};

export default function IncomingPaymentCard(props: IncomingPaymentCardProps) {
  const additionalInformation = [
    props.incomingPayment.summary,
    props.incomingPayment.accountIban,
    formatDate(props.incomingPayment.bookingDate),
  ];

  const additional = additionalInformation.filter((x) => x != '');

  const handleSetupCategory = () => {
    props.onSetupCategory(props.incomingPayment);
  };

  let detailsLink = <></>;

  if (props.incomingPayment.name.startsWith('AMAZON')) {
    const orderId = props.incomingPayment.summary.split(' ')[0];
    detailsLink = (
      <Button
        href={
          'https://www.amazon.de/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=' +
          orderId
        }
      >
        <ArrowRight /> Amazon
      </Button>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {additional.join(' · ')}
        </Typography>

        <Typography variant="h6" component="div">
          {props.incomingPayment.name}
        </Typography>

        {props.incomingPayment.accountIban && (
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            {props.incomingPayment.accountIban}
          </Typography>
        )}

        <Stack direction="row" justifyContent="right">
          <AmountChip amount={props.incomingPayment.amount / 100} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onApply(props.incomingPayment)}>
          Apply
        </Button>
        <Button size="small" onClick={handleSetupCategory}>
          Setup category
        </Button>
        {detailsLink}
      </CardActions>
    </Card>
  );
}
