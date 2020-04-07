import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { newFile } from './../services/FileService';
import Tooltip from '@material-ui/core/Tooltip';

export default function NewFileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [filename, setFilename] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    newFile(filename)
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
      <Tooltip title="Create New File">
      <Button style={{margin: '1px'}}
            variant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={handleClickOpen}
            >
            NEW
            </Button>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new file, please enter filename with extension.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="Filename"
            type="text"
            fullWidth
            required
            onChange={(e) => setFilename(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}