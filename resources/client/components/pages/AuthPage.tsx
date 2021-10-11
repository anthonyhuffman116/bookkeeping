import { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';
import PageRoot from '../atoms/PageRoot';

type AuthPageProps = {
  supabase: SupabaseClient;
};

export default function AuthPage(props: AuthPageProps) {
  const handleSignInWithDiscord = async () => {
    await props.supabase.auth.signIn({
      provider: 'discord',
    });
  };

  return (
    <PageRoot>
      please sign in with <p onClick={handleSignInWithDiscord}>Discord</p>
    </PageRoot>
  );
}
