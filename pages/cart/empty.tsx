import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts';
import { Box, Link, Typography } from '@mui/material';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const EmptyPage = () => {
  return (
    <ShopLayout
      title='Empty shopping cart'
      pageDescription='No items in shopping cart'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Your Shopping Cart is Empty!</Typography>
          <NextLink href='/' passHref style={{ textDecoration: 'none' }}>
            <Link typography='h4' component='h4' color='secondary'>
              Return
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
