import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import Result from '../components/Result';
import { Button } from '@mui/material';

const Forbidden = () => {
  const { t } = useTranslation();

  return (
    <Result
      extra={
        <Button color='secondary' component={RouterLink} to={`/admin`} variant='contained'>
          {t('common.backHome')}
        </Button>
      }
      image={<img src={'assets/403.svg'} alt='Logo' />}
      maxWidth='sm'
      subTitle={t('common.errors.forbidden.subTitle')}
      title={t('common.errors.unexpected.title')}
    />
  );
};

export default Forbidden;
