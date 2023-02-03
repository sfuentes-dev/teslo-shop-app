import useSWR from 'swr';
import NextLink from 'next/link';

import { AdminLayout } from '../../components/layouts';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IProduct } from '@/interfaces';
import { AddOutlined } from '@mui/icons-material';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Photo',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia component='img' className='fadeIn' image={row.img} />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link component='span'>{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Inventory' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      subTitle='Products Maintenance'
      icon={<CategoryOutlinedIcon />}
    >
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color='secondary' href='/admin/products/new'>
          Create Product
        </Button>
      </Box>

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
    </AdminLayout>
  );
};

export default ProductsPage;
