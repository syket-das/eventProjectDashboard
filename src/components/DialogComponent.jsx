import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { Cancel } from '@mui/icons-material';
const DialogComponent = ({
  children,
  title,
  description,
  open,
  setOpen,
  maxWidth,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{}}
      maxWidth={maxWidth || 'sm'}
      fullWidth
    >
      <DialogActions>
        <Button onClick={handleClose} color="error">
          <Cancel />
        </Button>
      </DialogActions>

      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
