import { Button, Typography } from '@mui/material';
import { User } from '@supabase/gotrue-js';
import React from 'react';

type LoggedInUserProps = {
  user: User;
  onLogout: () => void;
};

export default function LoggedInUser(props: LoggedInUserProps) {
  return (
    <>
      <Typography sx={{ fontSize: 12 }} component="div">
        {props.user.email}
      </Typography>
      <Button color="error" onClick={props.onLogout}>
        Sign out
      </Button>
    </>
  );
}
