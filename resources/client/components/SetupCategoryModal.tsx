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
import { beginOfMonth, removeTimeFromDate } from '../Utils';

type SetupCategoryModalProps = {
  onClose: () => void;
  onSubmit: (category: Category) => void;
  incomingPayment: null | IncomingPayment;
};

export default function SetupCategoryModal(props: SetupCategoryModalProps) {
  const [summary, setSummary] = useState<undefined | string>();
  const [every, setEvery] = useState<string | number>('');
  const [amount, setAmount] = useState<number>(10);
  const [dueDate, setDueDate] = useState<null | Date>(null);

  useEffect(() => {
    setSummary(props.incomingPayment?.summary.substr(0, 100));
    setAmount(props.incomingPayment?.amount ?? 0);
    setEvery('');
    setDueDate(
      props.incomingPayment?.bookingDate != null
        ? beginOfMonth(props.incomingPayment?.bookingDate)
        : null
    );
  }, [props.incomingPayment]);

  const handleClose = () => {
    props.onClose();
  };

  const handleButtonSubmit = () => {
    props.onSubmit({
      id: uuidv4(),
      summary: summary ?? '',
      every: every === '' ? null : parseInt(every.toString()),
      expectedAmount: amount,
      dueDate: every === '' ? null : dueDate,
      isActive: true,
    });
  };

  return (
    <StyledModal open={props.incomingPayment != null} onClose={handleClose}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Setup category
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {every != ''
          ? 'This will setup a regular payment that is due every ' + every + ' months.'
          : ''}
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
              onChange={(e) => setEvery(e.target.value)}
            >
              <MenuItem value={0}>never</MenuItem>
              <MenuItem value={1}>monthly</MenuItem>
              <MenuItem value={3}>quarterly</MenuItem>
              <MenuItem value={12}>yearly</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="amount"
              label="expected amount in cents"
              variant="outlined"
              type="number"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              defaultValue={amount}
            />
          </FormControl>

          {every != '' ? (
            <FormControl fullWidth>
              <DatePicker
                label="due date"
                views={['year', 'month', 'day']}
                openTo="month"
                value={dueDate}
                minDate={new Date('2010-01-01')}
                onChange={(newValue) => {
                  newValue != null
                    ? setDueDate(removeTimeFromDate(new Date(newValue)))
                    : setDueDate(null);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          ) : null}
        </Stack>
      </Box>
      <Button onClick={handleButtonSubmit}>Save</Button>
      <Button onClick={() => props.onClose()}>Cancel</Button>
    </StyledModal>
  );
}
