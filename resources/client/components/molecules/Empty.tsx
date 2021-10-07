import { Box, Typography } from '@mui/material';
import React from 'react';

type EmptyProps = {
  items: Array<any> | null;
  children: any;
  text?: string;
};

export default function Empty(props: EmptyProps) {
  const text = props.text ?? 'No data';
  const hasData = props.items && props.items.length > 0;

  return (
    <>
      {!hasData && (
        <Box>
          <Typography
            sx={{ fontSize: 12, textAlign: 'center' }}
            color="text.secondary"
            gutterBottom
          >
            {text}
          </Typography>
        </Box>
      )}
      {hasData && props.children}
    </>
  );
}
