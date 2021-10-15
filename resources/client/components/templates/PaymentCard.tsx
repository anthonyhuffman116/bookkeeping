import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../../Utils';
import AmountChip from '../atoms/AmountChip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { AppliedPayment } from 'resources/client/interfaces/Payment';

type PaymentCardProps = {
  payment: AppliedPayment;
};

export default function PaymentCard(props: PaymentCardProps) {
  let detailsLink = <></>;

  if (props.payment.transaction?.name.startsWith('AMAZON')) {
    const orderId = props.payment.transaction?.summary.split(' ')[0];
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
        <Stack direction="row" alignItems="end" justifyContent="space-between">
          <Stack>
            <Typography variant="h6" component="div">
              {props.payment.category.summary}
            </Typography>

            <Typography sx={{ fontSize: 14 }} component="div">
              {props.payment.summary}
            </Typography>

            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
              {formatDate(props.payment.bookingDate)}
            </Typography>
          </Stack>

          <AmountChip amount={props.payment.amount / 100} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {}}>
          Apply
        </Button>

        {detailsLink}
      </CardActions>
    </Card>
  );
}
