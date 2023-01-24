import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link component='span'>Go to Order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, fullName: 'Sebastian Fuentes', paid: true },
  { id: 2, fullName: 'Valentine Guzman', paid: true },
  { id: 3, fullName: 'Ross Geller', paid: false },
  { id: 4, fullName: 'Sheldon Cooper', paid: false },
  { id: 5, fullName: 'Kobe Bryant', paid: true },
  { id: 6, fullName: 'Michael Jordan', paid: false },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='Order History' pageDescription='Client Order History'>
      <Typography variant='h1' component='h1' marginBottom={2}>
        Order History
      </Typography>

      <Grid container>
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
