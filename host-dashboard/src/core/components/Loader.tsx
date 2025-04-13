import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Backdrop, Box, useTheme } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

function SuspenseLoader() {
  const theme = useTheme();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
        <ClipLoader color={theme.palette.primary.main} loading={true} size={40} />
      </Backdrop>
    </Box>
  );
}

export default SuspenseLoader;
