import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import Category from 'resources/client/interfaces/Category';
import { formatDate } from '../../Utils';
import AmountChip from '../atoms/AmountChip';
import Empty from '../molecules/Empty';

type CategoriesListProps = {
  categories: Category[];
};

export default function CategoriesList(props: CategoriesListProps) {
  return (
    <Stack spacing={1}>
      <Empty items={props.categories}>
        {props.categories.map((category: Category) => (
          <Card key={category.id}>
            <CardContent>
              <Grid container spacing={1} justifyItems="right">
                <Grid item xs={12}>
                  <Typography variant="h6" component="div">
                    {category.summary}
                  </Typography>
                </Grid>

                <Grid item xs={10}>
                  {category.dueDate != null ? (
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      {formatDate(category.dueDate)} (every {category.every} month)
                    </Typography>
                  ) : null}
                </Grid>

                <Grid item xs={2}>
                  <AmountChip amount={category.expectedAmount / 100} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Empty>
    </Stack>
  );
}
