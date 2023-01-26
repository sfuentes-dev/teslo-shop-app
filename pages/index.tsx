import { NextPage } from 'next';
import { ProductList } from '@/components/products';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '@/components/ui';

const HomePage: NextPage = () => {
  const { products, isLoading, isError } = useProducts('/products');

  return (
    <ShopLayout
      title={'Teslo Shop - Home'}
      pageDescription={'Find the best products of Teslo here.'}
    >
      <Typography variant='h1' component='h1'>
        Store
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
