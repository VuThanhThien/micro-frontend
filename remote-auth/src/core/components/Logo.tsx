import { Box, BoxProps } from '@mui/material';

type LogoProps = {
  colored?: boolean;
  size?: number;
  color?: string;
} & BoxProps;

const Logo = ({ colored = false, size = 40, color = 'currentColor', ...boxProps }: LogoProps) => {
  return (
    <Box {...boxProps} height={size} width={size}>
      <img
        src={'assets/logo.svg'}
        alt='Logo'
        style={{
          width: size,
          height: size,
          stroke: color,
        }}
      />
    </Box>
  );
};

export default Logo;
