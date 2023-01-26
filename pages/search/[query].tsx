import { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { dbProducts } from '@/database';
import { IProduct } from '../../interfaces/products';
import { ProductList } from '@/components/products';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'Teslo Shop - Search'}
      pageDescription={'Find the best products of Teslo here.'}
    >
      <Typography variant='h1' component='h1'>
        Search Products
      </Typography>

      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
          Search: {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>
            We did not find any product
          </Typography>
          <Typography
            variant='h2'
            sx={{ ml: 1 }}
            color='secondary'
            textTransform='capitalize'
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);

  const foundProducts: boolean = products.length > 0;

  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm('shirt');
  }

  // TODO: return similar products

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
