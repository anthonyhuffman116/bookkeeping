import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledModal from './StyledModal';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '@mui/lab';

const buildDueDate = (date: Date): Date => {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(1);

  return copy;
};

type SetupRegularModalProps = {
  onClose: () => void;
  onSubmit: (regular: Regular) => void;
  incomingPayment: null | IncomingPayment;
};

export default function SetupRegularModal(props: SetupRegularModalProps) {
  const [summary, setSummary] = useState<undefined | string>(props.incomingPayment?.summary);
  const [every, setEvery] = useState<number>(1);
  const [amount, setAmount] = useState<number>(10);
  const [dueDate, setDueDate] = useState<Date>(new Date());

  useEffect(() => {
    setSummary(props.incomingPayment?.summary);
    setAmount(props.incomingPayment?.amount ?? 0);
    setDueDate(buildDueDate(props.incomingPayment?.bookingDate ?? new Date()));
  }, [props.incomingPayment]);

  const handleClose = () => {
    props.onClose();
  };

  const handleButtonSubmit = () => {
    props.onSubmit({
      id: uuidv4(),
      summary: summary ?? '',
      every: every,
      amount: amount,
      dueDate: dueDate,
      isActive: true,
    });
  };

  return (
    <StyledModal open={props.incomingPayment != null} onClose={handleClose}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Setup regular payment
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        This will setup a regular payment that is due every {every} months.
      </Typography>
      <Box component="form">
        <Stack spacing={2}>
          <FormControl fullWidth>
            <TextField
              id="summary"
              label="summary"
              variant="outlined"
              onChange={(e) => setSummary(e.target.value)}
              defaultValue={summary}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">interval</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={every}
              label="Interval"
              onChange={(e) => setEvery(parseInt(e.target.value.toString()))}
            >
              <MenuItem value={1}>monthly</MenuItem>
              <MenuItem value={3}>quarterly</MenuItem>
              <MenuItem value={12}>yearly</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="amount"
              label="amount in cents"
              variant="outlined"
              type="number"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              defaultValue={amount}
            />
          </FormControl>

          <FormControl fullWidth>
            <DatePicker
              label="due date"
              views={['year', 'month', 'day']}
              openTo="month"
              value={dueDate}
              minDate={new Date('2010-01-01')}
              onChange={(newValue) => {
                setDueDate(newValue ?? new Date());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Stack>
      </Box>
      <Button onClick={handleButtonSubmit}>Save</Button>
    </StyledModal>
  );
}
