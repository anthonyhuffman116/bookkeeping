import { Button, Container, Stack, Typography } from '@mui/material';
import { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';
import PageRoot from '../atoms/PageRoot';

type AuthPageProps = {
  supabase: SupabaseClient;
};

export default function AuthPage(props: AuthPageProps) {
  const handleSignInWithDiscord = async () => {
    await props.supabase.auth.signIn(
      {
        provider: 'discord',
      },
      {
        redirectTo: location.protocol + '//' + location.host,
      }
    );
  };

  return (
    <PageRoot>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="primary.main" gutterBottom>
          bookkeeping
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          A place to bring order in the chaos that is personal finances.
        </Typography>

        <Typography align="center" color="text.secondary" paragraph sx={{ marginTop: '50px' }}>
          Please sign in with your favorite auth provider below:
        </Typography>

        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={handleSignInWithDiscord}>
            Discord
          </Button>
        </Stack>
      </Container>
    </PageRoot>
  );
}
