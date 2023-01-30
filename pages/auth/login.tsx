import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn, getProviders } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Chip,
  Divider,
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

  const router = useRouter();

  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn('credentials', { email, password });
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
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
                passHref
              >
                <Link component='span'>Create Account</Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='end'
              flexDirection='column'
            >
              <Divider sx={{ width: '100%', mb: 2 }} />

              {Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials')
                  return <div key='credentials'></div>;

                return (
                  <Button
                    key={provider.id}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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

export default LoginPage;
