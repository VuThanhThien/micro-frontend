import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@mui/material';
import SvgContainer from 'core/components/SvgContainer';
import { useAuth } from 'remoteAuth/contexts';

const WelcomeWidget = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent', mb: 2 }}>
      <CardContent>
        <Typography component="div" gutterBottom variant="h1">
          {t('admin.home.welcome.title', { name: userInfo?.firstName })}
        </Typography>
        <Typography component="div" sx={{ fontWeight: 300, mb: 3 }} variant="h1">
          {t('admin.home.welcome.subTitle')}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          gutterBottom
          marginBottom={2}
          variant="subtitle1"
        >
          {t('admin.home.welcome.message')}
        </Typography>
        <SvgContainer>
          <img src={'assets/welcome.svg'} alt="Logo" />
        </SvgContainer>
      </CardContent>
    </Card>
  );
};

export default WelcomeWidget;
