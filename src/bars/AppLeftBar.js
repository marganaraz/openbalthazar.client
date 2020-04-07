import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import SolidityIcon from './../images/solidity.png';
import VyperIcon from './../images/vyper.png';
import NewFileDialog from './NewFileDialog';
import { getFilesByUser, deleteFile } from './../services/FileService';
import CloudUpload from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    /*margin: theme.spacing(4, 0, 2),*/
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(3),
    padding: '0px', 
    margin:'0px',
  },
  listItemAvatar: { 
    minWidth:'20px'
  },
  listItemAvatarAvatar: {
    padding:'0px', 
    margin:'0px', 
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

const getFileName = (str) => {
    return str.split('\\').pop().split('/').pop();
};

export default function AppLeftBar(props) {
    const classes = useStyles()
    const [files, setFiles] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      refresh(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const init = useCallback(() => {
    //   refresh();
    // }, []);

    const handleClickVariant = (message, variant) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(message, { variant });
      
    };
    
    const refresh = () => {
      getFilesByUser()
      .then(response => {  
        setFiles(response.data);
        
        // Si tengo un solo archivo lo deberia cargar!
        var count = Object.keys(response.data).length;
        if(count === 1) props.loadFile(response.data[0]);
      })
      .catch(err => {
        console.log(err); 
      })
    };

    const deleteFilename = (file) => {
      deleteFile(file)
      .then(response => {  
        handleClickVariant('File deleted','success');
        refresh();

        // Si el que borro es el archivo que estoy editando, tengo que actualizar la UI
        if(file === props.currentFile) {
          props.resetUI();
        }
      })
      .catch(err => {
        console.log(err); 
      })
    };

    const getIcon = (file) => {
      return file.endsWith('vy') ? VyperIcon : SolidityIcon;
    }

    var filesTree = files.map(
        function iterator( file ) {

            return(
                <ListItem dense style={{padding:'0px', margin:'0px'}} key={file}>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Avatar src={getIcon(file)} className={classes.listItemAvatarAvatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={getFileName(file)}
                    secondary={null}
                    onClick={() => { props.loadFile(file) }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" edge="end" aria-label="delete" onClick={() => deleteFilename(file) }>
                      <DeleteIcon size="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            );
        },
        this
    );
    return (
        <Grid container>
          <Grid item xs={12}>
            <div style={{textAlign: 'center'}}>
              
                  <Tooltip title="Upload File">
                  <Button style={{margin: '1px'}}
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUpload />}
                    >
                    UPLOAD
                    </Button>
                    </Tooltip>
                  <NewFileDialog refresh={refresh} />
            </div>
          </Grid>
          <Grid item xs={12}>
          <div className={classes.demo}>
            <List dense={true}>
              {filesTree}
            </List>
          </div>
          </Grid>
        </Grid>
);
}