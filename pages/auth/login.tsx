import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <AuthLayout title='Log In'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1' mb={1}>
              Log In
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              variant='filled'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color='secondary'
              className='circular-btn'
              size='large'
              fullWidth
            >
              Log In
            </Button>
          </Grid>

          <Grid item xs={12}>
            <NextLink href='/auth/register' passHref>
              <Link component='span'>Create Account</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
