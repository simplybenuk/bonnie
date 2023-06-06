import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom'; // Changed this import
import { Stack } from '@mui/material';


function TermsModal() {
  const getCookieValue = (name) => {
    let matches = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return matches ? matches.pop() : '';
  }

  const [open, setOpen] = useState(getCookieValue('dismissModal') !== 'true');
  const [checked, setChecked] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      if (!checked) {
        const expire = new Date();
        expire.setDate(expire.getDate() + 7);
        document.cookie = `dismissModal=false; expires=${expire.toUTCString()}`;
      }
      setOpen(false);
    }
  };
  

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    if (event.target.checked) {
      document.cookie = `dismissModal=true; expires=${expire.toUTCString()}`;
    } else {
      document.cookie = `dismissModal=false; expires=${expire.toUTCString()}`;
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose}>
      
        <DialogTitle>
          Welcome to Bonnie
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>
              Bonnie uses <a href="https://www.openai.com/" target="_blank" rel="noopener noreferrer">OpenAI</a> to generate unique stories for you to read to your child. 
              Please make sure you review any stories created by Bonnie to ensure they are suitable for your child.
              By clicking <strong>"Accept"</strong>, you consent to our use of cookies as outlined in our <Link to="/privacy-policy">Privacy Policy</Link>.
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Accept
          </Button>
        </DialogActions>
    </Dialog>
  );
  
}

export default TermsModal;
