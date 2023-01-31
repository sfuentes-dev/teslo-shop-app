import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Displays information if the order is paid or not.',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Paid' variant='outlined' />
      ) : (
        <Chip color='error' label='No Paid' variant='outlined' />
      );
    },
  },
  {
    field: 'order',
    headerName: 'Order',
    description: 'Go to Order Page by Id',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link component='span'>Go to Order</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => {
    return {
      id: index + 1,
      fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      paid: order.isPaid,
      orderId: order._id,
    };
  });

  return (
    <ShopLayout title='Order History' pageDescription='Client Order History'>
      <Typography variant='h1' component='h1' marginBottom={2}>
        Order History
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user.id);

  return {
    props: {
      orders,
    },
  };
};
