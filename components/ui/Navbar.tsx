import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Navbar = () => {
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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men' passHref>
            <Link component='span'>
              <Button>Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link component='span'>
              <Button>Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link component='span'>
              <Button>Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
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

        <Button sx={{ marginLeft: 1 }}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
