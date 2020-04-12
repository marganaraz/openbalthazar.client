import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { uploadFile } from '../services/FileService';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import CloudUpload from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';

export default function UploadFileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  const [file, setFile] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setFile(null); 
    setFilename(''); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (event) => {
    
    if(event.target.files.length > 0) {
      setFilename(event.target.files[0].name);
      setFile(event.target.files[0]);
    }
    else {
      setFilename('');
      setFile(null);
    }
  };

  const handleCreate = () => {
    if(file != null) {
      uploadFile(file)
      .then(response => {
        setOpen(false);
        props.refresh();  
      })
      .catch(err => {
        console.log(err); 
      })
    }
  };

  return (
    <>
      <Tooltip title="Upload File">
        <IconButton color="primary" onClick={handleClickOpen} component="span">
          <CloudUpload />
        </IconButton>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload a file, please browse on your disk.
          </DialogContentText>
          <div style={{display: 'flex'}}>
            <Box component="div" style={{width: '300px', minWidth: '300px', minHeight: '20px'}} p={1} border={1} m={1} borderColor="primary.main" borderRadius="borderRadius">{filename}</Box>
            <input
            color="primary"
            accept=".sol,.vy"
            type="file"
            onChange={onChange}
            id="icon-button-file"
            style={{ display: 'none', }}
          />
          <label htmlFor="icon-button-file" style={{margin: '8px'}}>
            <Button
              variant="contained"
              component="span"
              size="medium"
              color="primary"
            >
              <CloudUpload />
            </Button>
          </label>
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}