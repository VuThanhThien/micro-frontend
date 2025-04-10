import { Alert, AlertColor, AlertTitle, Snackbar, SnackbarCloseReason } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SnackbarContextInterface {
  error: (newMessage: string) => void;
  success: (newMessage: string) => void;
}

export const SnackbarContext = createContext({} as SnackbarContextInterface);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleClose = (_event: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const error = (newMessage: string) => {
    setTitle(t('common.snackbar.error'));
    setMessage(newMessage);
    setSeverity('error');
    setOpen(true);
  };

  const success = (newMessage: string) => {
    setTitle(t('common.snackbar.success'));
    setMessage(newMessage);
    setSeverity('success');
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ error, success }}>
      {children}
      <Snackbar
        key={message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export default SnackbarProvider;
