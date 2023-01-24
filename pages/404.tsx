import { ShopLayout } from '@/components/layouts';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title='Page no found' pageDescription='No content to show here'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          We did not find the page you are looking for.
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
