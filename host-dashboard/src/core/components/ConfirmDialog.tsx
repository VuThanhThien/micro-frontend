import { useTranslation } from 'react-i18next';
import SvgContainer from './SvgContainer';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type ConfirmDialogProps = {
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  pending: boolean;
  title: string;
};

const ConfirmDialog = ({ description, onClose, onConfirm, open, pending, title }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
    >
      <DialogContent sx={{ textAlign: 'center' }}>
        <SvgContainer>
          <div style={{ maxWidth: 280, width: '100%' }}>
            <img src={'assets/confirm.svg'} alt='Logo' />
          </div>
        </SvgContainer>
        <DialogTitle id='confirm-dialog-title' sx={{ pb: 1, pt: 0 }}>
          {title}
        </DialogTitle>
        {description && <DialogContentText id='confirm-dialog-description'>{description}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <LoadingButton autoFocus onClick={onConfirm} loading={pending} variant='contained'>
          {t('common.confirm')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
