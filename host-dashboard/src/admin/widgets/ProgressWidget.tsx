import { Card, CardContent, Avatar, Box, Typography, LinearProgress } from '@mui/material';

type ProgressWidgetProps = {
  avatar: React.ReactNode;
  mb?: number;
  title: string;
  value: number;
};

const ProgressWidget = ({ avatar, mb = 0, title, value }: ProgressWidgetProps) => {
  return (
    <Card sx={{ mb }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 2 }}>{avatar}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography component="div" variant="h6">
              {title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography component="div" color="textSecondary">
              {`${value}%`}
            </Typography>
          </Box>
          <LinearProgress
            aria-label={`${title} progress`}
            sx={{ height: 8 }}
            variant="determinate"
            value={value}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;
