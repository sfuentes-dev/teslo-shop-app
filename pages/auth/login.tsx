import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { validations } from '@/utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title='Log In'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' mb={1}>
                Log In
              </Typography>
              <Chip
                label='We do not recognize this user or password'
                color='error'
                icon={<ErrorOutlinedIcon />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Email'
                type='email'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Minimum of 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                type='submit'
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
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
