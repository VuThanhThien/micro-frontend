import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography, Card, CardContent, Avatar, Box, IconButton, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const meetings = [
  {
    id: '1',
    person: 'Emmy Anderson',
    date: '8:00 - 10:00',
    image: 'img/portrait-1.jpg',
  },
  {
    id: '2',
    person: 'Joy McGlynn',
    date: '11:00 - 12:00',
    image: 'img/portrait-2.jpg',
  },
  {
    id: '3',
    person: 'Mara Dach',
    date: '14:00 - 15:00',
    image: 'img/portrait-3.jpg',
  },
];

const MeetingWidgets = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography component="h2" marginBottom={3} variant="h4">
        {t('admin.home.meeting.title')}
      </Typography>
      {meetings.map(meeting => (
        <Card key={meeting.id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={`${meeting.person} avatar`} src={meeting.image} sx={{ mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                {meeting.person}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {meeting.date}
              </Typography>
            </Box>
            <IconButton
              aria-label="Go to meeting details"
              component={RouterLink}
              to={`/admin/calendar`}
            >
              <ChevronRightIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
      <Button
        aria-label="Add new meeting"
        color="secondary"
        component={RouterLink}
        fullWidth
        to={`/admin/calendar`}
        variant="contained"
      >
        <AddIcon />
      </Button>
    </React.Fragment>
  );
};

export default MeetingWidgets;
