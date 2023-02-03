import { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Chip,
} from '@mui/material';

import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [isHovered, product.images]);

  return (
    <Grid
      key={product.slug}
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href={`/product/${product.slug}`} passHref prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color='primary'
                label='No Available'
                sx={{
                  position: 'absolute',
                  zIndex: 99,
                  top: '10px',
                  left: '10px',
                }}
              />
            )}

            <CardMedia
              component='img'
              image={productImage}
              alt={product.title}
              className='fadeIn'
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </Link>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
