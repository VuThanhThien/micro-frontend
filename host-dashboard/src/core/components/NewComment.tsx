import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Divider, List, ListItemButton, ListItemText, useTheme } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function NewComment({ open, handleClose }: { open: boolean; handleClose: () => void }) {
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
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <Typography sx={{ mr: 2, flex: 1, textAlign: 'center', color: theme.palette.text.primary }} variant='h6'>
            New Comment
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItemButton>
          <ListItemText primary='Haminton' secondary='Dec 11 12:00' />
        </ListItemButton>
        <Divider />
        <textarea
          autoFocus
          rows={10}
          className='w-full outline-0 px-5 mt-5 focus:border-0 focus-within:border-0 focus-visible:border-0'
          placeholder='Type your comment'
        />
      </List>
      <Box
        className='absolute bottom-0 left-0  h-30 w-full px-5'
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Box className='flex justify-end'>
          <Button onClick={handleClose} variant='contained' sx={{ mt: 2, px: 5, fontSize: '16px', color: 'white' }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
