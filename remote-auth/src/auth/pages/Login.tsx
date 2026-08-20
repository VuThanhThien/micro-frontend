import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import BoxedLayout from 'core/components/BoxedLayout';
import { useAuth } from '../contexts/AuthProvider';
import { LoadingButton } from '@mui/lab';
import { Grid, Paper, Typography, Box, TextField, Button, Link } from '@mui/material';
import { useSnackbar } from 'remoteComponents/contexts';

const Login = () => {
  const { isLoggingIn, login, userInfo, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  // Set once the login POST succeeds. We intentionally delay navigation until the
  // auth session (userInfo) has actually resolved: navigating to /admin while the
  // auth context is still empty makes AdminLayout mount in an unauthenticated,
  // loading state and bounce the user straight back to /login on first login.
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then(() => setLoggedIn(true))
      .catch(() => snackbar.error(t('common.errors.unexpected.subTitle')));
  };

  useEffect(() => {
    if (loggedIn && !authLoading && userInfo) {
      snackbar.success('Login success! Redirecting you to home page...');
      navigate(`/admin`, { replace: true });
    }
  }, [loggedIn, authLoading, userInfo, navigate, snackbar]);

  const formik = useFormik({
    initialValues: {
      email: 'demo@example.com',
      password: "guWEK<'r/-47-XG3",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      password: Yup.string()
        .min(8, t('common.validations.min', { size: 8 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: values => handleLogin(values.email, values.password),
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./img/startup.svg)',
          backgroundRepeat: 'no-repeat',
          bgcolor: 'background.default',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component="h1" variant="h5">
            {t('auth.login.title')}
          </Typography>
          <Box component="form" marginTop={3} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              label={t('auth.login.form.email.label')}
              name="email"
              autoComplete="email"
              autoFocus
              disabled={isLoggingIn}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label={t('auth.login.form.password.label')}
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isLoggingIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} to={`/forgot-password`} variant="body2">
                {t('auth.login.forgotPasswordLink')}
              </Link>
            </Box>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoggingIn}
              variant="contained"
              sx={{ mt: 3 }}
            >
              {t('auth.login.submit')}
            </LoadingButton>
            <Button
              component={RouterLink}
              to={`/register`}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('auth.login.newAccountLink')}
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
