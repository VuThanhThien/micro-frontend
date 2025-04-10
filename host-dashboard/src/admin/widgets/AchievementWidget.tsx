import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import { useAuth } from 'remoteAuth/contexts';

const AchievementWidget = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', mb: 3 }}>
          <StarIcon color='primary' />
        </Avatar>
        <Typography gutterBottom variant='h5' component='div'>
          {t('admin.home.achievement.title', { name: userInfo?.firstName })}
        </Typography>
        <Typography marginBottom={3} variant='body2'>
          {t('admin.home.achievement.description', {
            progress: userInfo?.progress,
          })}
        </Typography>
        <Button color='secondary' component={RouterLink} to={`/admin/profile`} variant='contained'>
          {t('admin.home.achievement.action')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AchievementWidget;
