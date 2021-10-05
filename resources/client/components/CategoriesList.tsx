import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../Utils';
import Amount from './Amount';

type CategoriesListProps = {
  isFetching: boolean;
  categories: Category[];
};

export default function CategoriesList(props: CategoriesListProps) {
  let list;

  if (props.isFetching) {
    list = <CircularProgress />;
  } else {
    list = (
      <>
        {props.categories.map((category: Category) => (
          <Card key={category.id}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {category.dueDate != null ? (
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      {formatDate(category.dueDate)} (every {category.every} month)
                    </Typography>
                  ) : null}
                </Grid>

                <Grid item xs={10}>
                  <Typography variant="h6" component="div">
                    {category.summary}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Amount amount={category.expectedAmount / 100} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return <Stack spacing={1}>{list}</Stack>;
}
