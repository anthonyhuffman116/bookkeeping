import { Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../Utils';
import Amount from './Amount';

type RegularsListProps = {
  isFetching: boolean;
  regulars: Regular[];
};

export default function RegularsList(props: RegularsListProps) {
  return (
    <Stack spacing={1}>
      {props.regulars.map((regular: Regular) => (
        <Card key={regular.id}>
          <CardContent>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {formatDate(regular.dueDate)} (every {regular.every} month)
            </Typography>
            <Typography variant="h6" component="div">
              {regular.summary}
            </Typography>

            <Amount amount={regular.amount / 100} />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
