import { Container } from '@mui/material';
import React from 'react';

type PageRootProps = {
  children: any;
};

export default function PageRoot(props: PageRootProps) {
  return <Container sx={{ marginTop: '70px' }}>{props.children}</Container>;
}
