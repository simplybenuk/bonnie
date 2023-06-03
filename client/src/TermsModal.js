import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function TermsModal() {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      const expire = new Date();
      expire.setDate(expire.getDate() + 7);
      document.cookie = `dismissModal=true; expires=${expire.toUTCString()}`;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Welcome to Bonnie
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please accept the terms before using Bonnie.
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              name="check"
            />
          }
          label="Please don't show this message again for 7 days."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TermsModal;
