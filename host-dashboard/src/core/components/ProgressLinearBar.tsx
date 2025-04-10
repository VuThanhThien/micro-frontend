import { LinearProgress, linearProgressClasses, styled } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E45851',
    ...theme.applyStyles('dark', {
      backgroundColor: '#E45851',
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#62CA76',
    ...theme.applyStyles('dark', {
      backgroundColor: '#62CA76',
    }),
  },
}));

export default BorderLinearProgress;
