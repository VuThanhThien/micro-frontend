import BottomNavigation from '@material-ui/core/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { Paper, BottomNavigationAction, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const menuItems = [
  {
    icon: <HomeIcon />,
    key: 'admin.drawer.menu.home',
    path: '/admin',
  },
  {
    icon: <BarChartIcon />,
    key: 'admin.drawer.menu.dashboard',
    path: '/admin/dashboard',
  },
  {
    icon: <PeopleIcon />,
    key: 'admin.drawer.menu.userManagement',
    path: '/admin/user-management',
  },
  {
    icon: <AccountTreeIcon />,
    key: 'admin.drawer.menu.projects',
    path: '/admin/projects',
  },
  {
    icon: <HelpCenterIcon />,
    key: 'admin.drawer.menu.help',
    path: '/admin/help',
  },
];

const BottomNavBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = useState(menuItems[0].path);
  const location = useLocation();
  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', pb: 4 }} elevation={3}>
      <BottomNavigation style={{ backgroundColor: theme.palette.background.paper }} showLabels value={value}>
        {menuItems.map((item) => {
          return (
            <BottomNavigationAction
              href={item.path}
              key={item.key}
              value={item.path}
              label={t(item.key)}
              icon={item.icon}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
