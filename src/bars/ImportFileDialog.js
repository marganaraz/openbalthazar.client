import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CodeIcon from '@material-ui/icons/Code';
import { importFile } from '../services/FileService';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default function ImportFileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    importFile(address)
    .then(response => {
      setOpen(false);
      props.refresh();  
    })
    .catch(err => {
      console.log(err); 
    })
  };

  return (
    <>
      <Tooltip title="Import File from Etherscan">
        <IconButton color="primary" onClick={handleClickOpen} component="span">
          <CodeIcon />
        </IconButton>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Import File from Etherscan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To import a file from Etherscan, please enter contract's address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}