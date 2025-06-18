import { Button, Flex, NavLink, Stack } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export const NavLinkGroup = ({ toggle }: { toggle: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Flex direction='column' justify='space-between' h='100%'>
      <Stack>
        <NavLink
          label='Home'
          onClick={() => {
            toggle();
            navigate('/');
          }}
          active={location.pathname === '/'}
          styles={(theme) => ({
            label: {
              fontSize: theme.fontSizes.md,
            },
          })}
        />
        <NavLink
          label='Quizzes'
          onClick={() => {
            toggle();
            navigate('/quizzes');
          }}
          active={location.pathname === '/quizzes'}
          styles={(theme) => ({
            label: {
              fontSize: theme.fontSizes.md,
            },
          })}
        />
        <NavLink
          label='Stats'
          onClick={() => {
            toggle();
            navigate('/stats');
          }}
          active={location.pathname === '/stats'}
          styles={(theme) => ({
            label: {
              fontSize: theme.fontSizes.md,
            },
          })}
        />
      </Stack>

      <Button variant='light' mt='auto' onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
};
