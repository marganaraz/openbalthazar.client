import React, {Component} from 'react';
import { GoogleLogout } from 'react-google-login';
import { Config } from './Config';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import AppTopBar from './AppTopBar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const clientId = Config.GoogleAPIKey;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            code: '',
            value: 0,
          };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem("user"));
        this.setState({usuario: user.name});
    }

    logout = () => {
        // Reidcciono al Home
        localStorage.setItem("user", null);
        this.props.history.push('/');
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    }

    render(){
        const { usuario, code, value } = this.state;
        const { classes } = this.props;
        return(
            <div>
                <div>
                    <AppTopBar />
                    <h1>{usuario}</h1>
                    <GoogleLogout buttonText="Logout" clientId={clientId} onLogoutSuccess={this.logout} />
                </div>
                <div>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={this.handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Verify" {...a11yProps(0)} />
                            <Tab label="Skynet" {...a11yProps(1)} />
                            <TabPanel value={value} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div>
                        
                        <CodeMirror
                            value={code}
                            options={{
                                mode: 'text/x-csharp',
                                theme: 'default',
                                lineNumbers: true
                            }}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({code: value});
                            }}
                            onChange={(editor, data, value) => {
                                this.setState({code: value});
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(Menu);