import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const RegisterPage = () => {
  return (
    <AuthLayout title='Create Account'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1' mb={1}>
              Register
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Full Name' variant='filled' fullWidth />
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
            Do you have Account?
            <NextLink href='/auth/login' passHref>
              <Link component='span'> Log In</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
