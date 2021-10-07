import { CircularProgress } from '@mui/material';
import React from 'react';

type IsFetchingProps = {
  isFetching: boolean;
  children: any;
};

export default function IsFetching(props: IsFetchingProps) {
  return props.isFetching ? <CircularProgress /> : props.children;
}
