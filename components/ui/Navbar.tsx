import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';
import NextLink from 'next/link';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export const Navbar = () => {
  const { asPath, push } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className='fadeIn'
        >
          <NextLink href='/category/men' passHref>
            <Link component='span'>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link component='span'>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link component='span'>
              <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* Desktop Screens */}

        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type='text'
            placeholder='Search...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
          >
            <SearchOutlinedIcon />
          </IconButton>
        )}

        {/* Phone Screens */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu} sx={{ marginLeft: 1 }}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};
