import { useContext } from 'react';
import { UiContext } from '@/context';
import NextLink from 'next/link';

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref style={{ textDecoration: 'none' }}>
          <Link display='flex' alignItems='center' component='span'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu} sx={{ marginLeft: 1 }}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};
