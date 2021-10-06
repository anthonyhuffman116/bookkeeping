import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  let p = props;
  let value = props.value;
  const label = Math.round(value);

  if (props.value == 100) {
    p = { ...props, color: 'success' };
  } else if (props.value > 100) {
    p = { ...props, color: 'error' };
    value = 100;
  } else if (props.value > 80) {
    p = { ...props, color: 'warning' };
  } else {
    p = { ...props, color: 'secondary' };
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...p} value={value} />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${label}%`}</Typography>
      </Box>
    </Box>
  );
}
