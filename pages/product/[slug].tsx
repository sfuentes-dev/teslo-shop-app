import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllProductSlug, getProductBySlug } from '@/database/dbProducts';
import { ShopLayout } from '@/components/layouts';
import { ProductSlideShow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

interface Props {
  product: IProduct;
}

const ProductPage = ({ product }: Props) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${product.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity:</Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            <Button color='secondary' className='circular-btn'>
              Add to Cart
            </Button>

            {/* <Chip label='No Available' color='error' variant='outlined' /> */}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description:</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const products = await getAllProductSlug();

  const productsSlugs: string[] = products.map((product) => product.slug);

  return {
    paths: productsSlugs.map((slug) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400, // 60 * 60 * 24
  };
};

export default ProductPage;
