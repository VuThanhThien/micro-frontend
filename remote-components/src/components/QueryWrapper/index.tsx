import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useQueryErrorResetBoundary } from 'react-query';
import { Button } from '@mui/material';
import Result from 'components/Result';
import Loader from 'components/Loader';

type ErrorWrapperProps = {
  children: React.ReactNode;
};

const ErrorWrapper = ({ children }: ErrorWrapperProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const { t } = useTranslation();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Result
          extra={
            <Button onClick={() => resetErrorBoundary()} variant='contained'>
              {t('common.retry')}
            </Button>
          }
          status='error'
          subTitle={t('common.errors.unexpected.subTitle')}
          title={t('common.errors.unexpected.title')}
        />
      )}
    >
      <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default ErrorWrapper;
