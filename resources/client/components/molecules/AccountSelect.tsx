import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Account from '../../interfaces/Account';
import React from 'react';

type AccountSelectProps = {
  items: Account[];
  value?: null | Account;
  onSelect: (Account) => void;
};

export default function AccountSelect(props: AccountSelectProps) {
  let value: null | string = props.value?.iban ?? props.items[0]?.iban;

  if (props.items.findIndex((x) => x.iban === value) === -1) {
    value = null;
  }

  const handleChange = (e: SelectChangeEvent) => {
    const account = props.items.filter((x) => x.iban == e.target.value)[0];

    props.onSelect(account);
  };

  return (
    <>
      {value !== null && (
        <FormControl>
          <InputLabel id="select-account-label">Account</InputLabel>
          <Select
            labelId="select-account-label"
            id="select-account"
            value={value}
            label="Account"
            onChange={handleChange}
          >
            {props.items.map((a: Account) => (
              <MenuItem value={a.iban} key={a.iban}>
                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Box sx={{}}>{a.name}</Box>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    {a.iban}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
