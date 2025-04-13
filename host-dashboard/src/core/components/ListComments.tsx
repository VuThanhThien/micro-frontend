import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Divider, List, ListItemButton, ListItemText, useTheme } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import AddCommentIcon from '@mui/icons-material/AddComment';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListComments({
  open,
  handleClose,
  handleNewComment,
}: {
  open: boolean;
  handleClose: () => void;
  handleNewComment: () => void;
}) {
  const theme = useTheme();
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: theme.palette.background.paper,
        },
      }}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: theme.palette.background.paper }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <Typography
            sx={{ mr: 2, flex: 1, textAlign: 'center', color: theme.palette.text.primary }}
            variant="h6"
          >
            All Comments
          </Typography>
          <IconButton edge="start" color="success" onClick={handleNewComment} aria-label="close">
            <AddCommentIcon sx={{ color: 'green' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListItemButton>
          <ListItemText>
            <Box className="flex gap-2">
              <MessageIcon />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    color: theme.palette.text.primary,
                  }}
                >
                  Haminton 2042
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: theme.palette.text.primary,
                  }}
                >
                  Dec 11 12:00CT
                </Typography>
                <Typography
                  component={'p'}
                  className="truncate max-w-[350px]"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: theme.palette.text.primary,
                  }}
                >
                  Tried to restart, but unable to do so, calling SLB field tech to help troubleshoot
                </Typography>
              </Box>
            </Box>
          </ListItemText>
        </ListItemButton>
        <Divider />

        <ListItemButton>
          <ListItemText>
            <Box className="flex gap-2">
              <MessageIcon />
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}
                >
                  Haminton 2042
                </Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>
                  Dec 11 12:00CT
                </Typography>
                <Typography
                  component={'p'}
                  className="truncate max-w-[350px]"
                  sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}
                >
                  Tried to restart, but unable to do so, calling SLB field tech to help troubleshoot
                </Typography>
              </Box>
            </Box>
          </ListItemText>
        </ListItemButton>
        <Divider />

        <ListItemButton>
          <ListItemText>
            <Box className="flex gap-2">
              <MessageIcon />
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}
                >
                  Haminton 2042
                </Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>
                  Dec 11 12:00CT
                </Typography>
                <Typography
                  component={'p'}
                  className="truncate max-w-[350px]"
                  sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}
                >
                  Tried to restart, but unable to do so, calling SLB field tech to help troubleshoot
                </Typography>
              </Box>
            </Box>
          </ListItemText>
        </ListItemButton>
        <Divider />
      </List>
    </Dialog>
  );
}
