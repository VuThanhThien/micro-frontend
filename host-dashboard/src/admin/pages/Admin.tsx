import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SettingsDrawer from '../../core/components/SettingsDrawer';
import { useSettings } from '../../core/contexts/SettingsProvider';
import AdminDrawer from '../components/AdminDrawer';
import { Box, Toolbar } from '@mui/material';
import QueryWrapper from 'core/components/QueryWrapper';
import { useAuth } from 'remoteAuth/contexts';

const AdminLayout = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { collapsed, open, toggleDrawer } = useSettings();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };
  const { hasRole, userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    }
    //TODO: enhance RBAC later
    if (!!userInfo && !hasRole(['Admin'])) {
      navigate(`/403`);
    }
  }, [userInfo, hasRole]);

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
