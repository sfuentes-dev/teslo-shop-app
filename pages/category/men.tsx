import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const MenPage = () => {
  const { products, isLoading, isError } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title='Teslo Shop - Men'
      pageDescription='Find the best Teslo products for Men'
    >
      <Typography variant='h1' component='h1'>
        Men
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Men Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
