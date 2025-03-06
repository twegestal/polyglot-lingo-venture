import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../../styles/AuthenticationImage.module.css';
import { useState } from 'react';

export const AuthenticationForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta='center' mt='md' mb={50}>
          {isRegistering ? 'Create an Account' : 'Welcome to Polyglot Lingo Venture!'}
        </Title>

        <TextInput label='Email address' placeholder='hello@gmail.com' size='md' />

        <PasswordInput label='Password' placeholder='Your password' mt='md' size='md' />

        {isRegistering && (
          <PasswordInput
            label='Confirm Password'
            placeholder='Confirm your password'
            mt='md'
            size='md'
          />
        )}

        {!isRegistering && <Checkbox label='Keep me logged in' mt='xl' size='md' />}

        <Button fullWidth mt='xl' size='md'>
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
