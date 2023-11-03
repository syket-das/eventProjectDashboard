import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            border: `1px solid ${colors.grey[300]}`,
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            border: `1px solid ${colors.grey[300]}`,
          }}
          onClick={handleClose}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
