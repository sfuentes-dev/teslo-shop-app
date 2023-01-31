import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { CartContext } from '@/context';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { countries } from '@/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {
  const router = useRouter();
  const { numberOfItems, shippingAddress, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`);
  };

  if (!shippingAddress) {
    return <></>;
  }

  const { firstName, lastName, address, address2, city, country, phone, zip } =
    shippingAddress;

  return (
    <ShopLayout title='Purchase Summary' pageDescription='Purchase summary'>
      <Typography variant='h1' component='h1' marginBottom={2}>
        Purchase Summary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'Product' : 'Products'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery address</Typography>
                <NextLink href='/checkout/address'>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? `,${address2}` : ''}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart'>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>
              </Box>

              <Chip
                color='error'
                label={errorMessage}
                sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
