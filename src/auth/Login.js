import React from 'react'
import GoogleLogin from 'react-google-login';
import { Config } from '../config/Config';
import { login } from '../services/AuthService';
import Ethereum from './../images/ethereum.png';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';

const clientId = Config.GoogleAPIKey;

const useStyles = makeStyles({
  root: {
    padding: '10px',
    width: 500
  },
  media: {
    height: 344,
    width: 500,
  },
});

const success = (response) => {

    // tengo que llamar un axios a la API
    login(response.tokenId)
    .then(r => {  
      
      const userObject = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password: 'test',
        token: r.data.token,
        imageUrl: response.profileObj.imageUrl,
        lastFile: ''
      }

      localStorage.setItem("user", JSON.stringify(userObject));
    
      window.location.href = '/menu';
  })
  .catch(err => {
    console.log(err); 
  })
}

const error = response => {
  console.error(response) // eslint-disable-line
}

export default function Login () {
  const classes = useStyles();

  return (
    <>
    <div style={{ display:'flex', justifyContent:'center', paddingTop:'20px' }}>
      <Card className={classes.root}>
      <CardActionArea style={{justifyContent:'center'}}>
        <CardMedia
          className={classes.media}
          image={Ethereum}
          title="Ethereum"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            OpenBalthazar
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          OpenBalthazar is a
          static program analysis web tool for Ethereum platform´s smart contracts implemented with
          Microsoft.NET Core as backed and React in frontend.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent:'center'}}>
        <GoogleLogin theme="dark" onSuccess={success} onFailure={error} clientId={clientId} />
        
      </CardActions>
    </Card>
    </div>
    <div style={{display: 'flex', justifyContent:'center', padding: '4px'}}>
      <div style={{display: 'flex', justifyContent:'center', padding: '4px'}}>
        <TwitterIcon color="primary" fontSize="small" /><Typography style={{fontSize: '6'}} color="primary">@mauro_arganaraz</Typography>
      </div>
      <div style={{display: 'flex', justifyContent:'center', padding: '4px'}}>
        <MailIcon color="primary" fontSize="small" /><Typography style={{fontSize: '6'}} color="primary">marganaraz@gmail.com</Typography>
      </div>
  </div>
  </>
  );
}