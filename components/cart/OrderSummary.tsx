import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { Grid, Typography } from '@mui/material';
import { currency } from '@/utils';
import { IOrder, IOrderItem } from '@/interfaces';

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary = ({ orderValues }: Props) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, tax, total };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products Qty: </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {summaryValues.numberOfItems}{' '}
          {summaryValues.numberOfItems > 1 ? 'products' : 'product'}{' '}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%):
        </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>
      <Grid item xs={6} marginTop={2}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' marginTop={2}>
        <Typography variant='subtitle1'>
          {currency.format(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
