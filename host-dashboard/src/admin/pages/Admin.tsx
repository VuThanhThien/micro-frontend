import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SettingsDrawer from '../../core/components/SettingsDrawer';
import { useSettings } from '../../core/contexts/SettingsProvider';
import AdminDrawer from '../components/AdminDrawer';
import { Box, Toolbar } from '@mui/material';
import QueryWrapper from 'core/components/QueryWrapper';
import Loader from 'core/components/Loader';
import { useAuth } from 'remoteAuth/contexts';

const AdminLayout = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { collapsed, open, toggleDrawer } = useSettings();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };
  const { hasRole, userInfo, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until the auth session has been resolved; redirecting early while
    // `userInfo` is still loading bounces the user back to /login on first login.
    if (authLoading) {
      return;
    }
    if (!userInfo) {
      navigate(`/login`);
      return;
    }
    //TODO: enhance RBAC later
    if (!hasRole(['Admin'])) {
      navigate(`/403`);
    }
  }, [authLoading, userInfo, hasRole]);

  if (authLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer
        collapsed={collapsed}
        mobileOpen={open}
        onDrawerToggle={toggleDrawer}
        onSettingsToggle={handleSettingsToggle}
      />
      <SettingsDrawer onDrawerToggle={handleSettingsToggle} open={settingsOpen} />
      <Box component="main" sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}>
        <Toolbar />
        <QueryWrapper>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default AdminLayout;
