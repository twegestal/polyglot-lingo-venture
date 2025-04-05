import { Anchor, Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import classes from '../../styles/AuthenticationImage.module.css';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth';

export const AuthenticationForm = () => {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta='center' mt='md' mb={50}>
          {isRegistering ? 'Create an Account' : 'Welcome to Polyglot Lingo Venture!'}
        </Title>

        <TextInput
          label='Email address'
          placeholder='hello@gmail.com'
          size='md'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='md'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        {isRegistering && (
          <PasswordInput
            label='Confirm Password'
            placeholder='Confirm your password'
            mt='md'
            size='md'
            disabled
          />
        )}

        {error && (
          <Text c='red' ta='center' mt='md'>
            {error}
          </Text>
        )}

        <Button fullWidth mt='xl' size='md' onClick={handleLogin} loading={loading}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </Button>

        <Text ta='center' mt='md'>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Anchor<'a'>
            href='#'
            fw={700}
            onClick={(event) => {
              event.preventDefault();
              setIsRegistering((prev) => !prev);
            }}
          >
            {isRegistering ? 'Login' : 'Register'}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};
