import React from 'react';
import AdminAppBar from '../components/AdminAppBar';
import AdminToolbar from '../components/AdminToolbar';
import RecentNotifications from '../components/RecentNotifications';
import AchievementWidget from '../widgets/AchievementWidget';
import FollowersWidget from '../widgets/FollowersWidget';
import MeetingWidgets from '../widgets/MeetingWidgets';
import PersonalTargetsWidget from '../widgets/PersonalTargetsWidget';
import ViewsWidget from '../widgets/ViewsWidget';
import WelcomeWidget from '../widgets/WelcomeWidget';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <RecentNotifications />
        </AdminToolbar>
      </AdminAppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <WelcomeWidget />
          <AchievementWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FollowersWidget />
          <ViewsWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PersonalTargetsWidget />
          <MeetingWidgets />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
