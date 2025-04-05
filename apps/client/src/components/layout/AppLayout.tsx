import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppShell, Group, Burger, Image } from '@mantine/core';

import { NavLinkGroup } from '../nav/NavLinkGroup';
import logo from '../../assets/logo.svg';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
          <Link to='/'>
            <Image src={logo} className='logo' />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <NavLinkGroup toggle={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
