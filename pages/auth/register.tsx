import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
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
import { validations } from '@/utils';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { registerUser } = useContext(AuthContext);

  const router = useRouter();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title='Create Account'>
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' mb={1}>
                Register
              </Typography>
            </Grid>

            <Chip
              label='We do not recognize this user or password'
              color='error'
              icon={<ErrorOutlinedIcon />}
              className='fadeIn'
              sx={{ display: showError ? 'flex' : 'none' }}
            />

            <Grid item xs={12}>
              <TextField
                label='Full Name'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: { value: 2, message: 'Minimum of 2 characters' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Email'
                variant='filled'
                type='email'
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
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12}>
              Already have an account?
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : '/auth/login'
                }
                passHref
              >
                <Link component='span'> Log In</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
