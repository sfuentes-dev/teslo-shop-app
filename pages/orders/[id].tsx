import NextLink from 'next/link';
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
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

const OrderPage = () => {
  return (
    <ShopLayout title='Order Summary 1231234' pageDescription='Order summary'>
      <Typography variant='h1' component='h1' marginBottom={2}>
        Order: ABC123
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label='Payment Pending'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlinedIcon />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label='Order Paid'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlinedIcon />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 Products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery address</Typography>
                <NextLink href='/checkout/address'>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography>Sebastian Fuentes</Typography>
              <Typography>123 Nowhere</Typography>
              <Typography>Davy Jones, Locker</Typography>
              <Typography>Japan</Typography>
              <Typography>+1 234 456</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart'>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h2>Pay</h2>
              </Box>

              <Chip
                sx={{ my: 2 }}
                label='Order Paid'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlinedIcon />}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
