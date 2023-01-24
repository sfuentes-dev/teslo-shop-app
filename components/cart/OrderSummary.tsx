import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products Qty: </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>${155.34}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes (15%):</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>${23}</Typography>
      </Grid>
      <Grid item xs={6} marginTop={2}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' marginTop={2}>
        <Typography variant='subtitle1'>${200}</Typography>
      </Grid>
    </Grid>
  );
};
