import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const users = [
  {
    id: '1',
    firstName: 'Rhys',
    gender: 'M',
    lastName: 'Arriaga',
    role: 'Admin',
  },
  {
    id: '2',
    firstName: 'Laura',
    gender: 'F',
    lastName: 'Core',
    role: 'Member',
  },
  {
    id: '3',
    firstName: 'Joshua',
    gender: 'M',
    lastName: 'Jagger',
    role: 'Member',
  },
];

const UsersWidget = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('dashboard.users.title')} />
      <CardContent>
        <List>
          {users.map(user => (
            <ListItem disableGutters key={user.id}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.lastName} ${user.firstName}`}
                primaryTypographyProps={{
                  fontWeight: theme.typography.fontWeightMedium,
                }}
                secondary={user.role}
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Go to user details"
                  component={RouterLink}
                  edge="end"
                  to={`/admin/user-management`}
                >
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UsersWidget;
