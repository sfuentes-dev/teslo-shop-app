import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../../context/cart/CartContext';

import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { ICartProduct, IOrderItem } from '@/interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList = ({ editable = false, products }: Props) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
          <Grid item xs={3}>
            <Link href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={product.image}
                  component='img'
                  sx={{ borderRadius: '5px' }}
                />
              </CardActionArea>
            </Link>
          </Grid>

          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updateQuantity={(value) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant='h6'>
                  {product.quantity} {product.quantity > 1 ? 'Products' : 'Product'}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>

            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
