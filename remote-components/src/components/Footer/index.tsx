import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" component={RouterLink} to={`/`}>
          {import.meta.env.VITE_APP_NAME}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
