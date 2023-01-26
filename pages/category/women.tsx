import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const WomenPage = () => {
  const { products, isLoading, isError } = useProducts(
    '/products?gender=women'
  );

  return (
    <ShopLayout
      title='Teslo Shop - Women'
      pageDescription='Find the best Teslo products for woman'
    >
      <Typography variant='h1' component='h1'>
        Women
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Women Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
