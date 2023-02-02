import { GetServerSideProps, NextPage } from 'next';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout
      title='Order Summary'
      subTitle={`OrderId: ${order._id}`}
      icon={<AirplaneTicketOutlinedIcon />}
    >
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Order Paid'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlinedIcon />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Payment Pending'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlinedIcon />}
        />
      )}

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({order.numberOfItems}{' '}
                {order.numberOfItems > 1 ? 'Products' : 'Product'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography variant='subtitle1'>Delivery address</Typography>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ''}
              </Typography>
              <Typography>
                {shippingAddress.city} {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.address}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='column'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Order Paid'
                      variant='outlined'
                      color='success'
                      icon={<CreditScoreOutlinedIcon />}
                    />
                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Pending'
                      variant='outlined'
                      color='error'
                      icon={<CreditScoreOutlinedIcon />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
