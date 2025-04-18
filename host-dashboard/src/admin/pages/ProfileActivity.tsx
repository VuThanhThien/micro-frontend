import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Trans, useTranslation } from 'react-i18next';
import { useDateLocale } from '../../core/hooks/useDateLocale';
import { logKeys } from '../config/activity';
import { useActivityLogs } from '../hooks/useActivityLogs';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Empty from 'core/components/Empty';

const ProfileActivity = () => {
  const locale = useDateLocale();
  const { t } = useTranslation();

  const { data } = useActivityLogs();

  if (!data || data.length === 0) {
    return <Empty title={t('profile.activity.empty')} />;
  }

  return (
    <Box sx={{ '& .MuiTimelineItem-root:before': { content: 'none' } }}>
      <Timeline>
        {data.map(log => (
          <TimelineItem key={log.id}>
            <TimelineSeparator>
              <TimelineDot color="grey" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent>
                  <Trans
                    components={{ bold: <strong /> }}
                    defaults="<bold>You</bold> modify resource <bold>{{ resouce }}</bold>"
                    i18nKey={logKeys[log.code]}
                    values={log.params}
                  />
                  <Typography component="div" marginTop={1} variant="caption">
                    {formatDistanceToNow(new Date(log.createdAt), {
                      addSuffix: true,
                      locale,
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default ProfileActivity;
