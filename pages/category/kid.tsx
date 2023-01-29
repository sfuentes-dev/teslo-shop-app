import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const KidPage = () => {
  const { products, isLoading, isError } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title='Teslo Shop - Kids'
      pageDescription='Find the best Teslo products for kids'
    >
      <Typography variant='h1' component='h1'>
        Kids
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Kids Products
      </Typography>

      <h1></h1>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
