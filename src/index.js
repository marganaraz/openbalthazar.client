import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import Etherscan from './Etherscan';
import { SnackbarProvider } from 'notistack';

const routing = (
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
    <Router>
      <div>        
        <Switch>
        <Route exact path="/" component={App} />
        <Route path="/menu" component={Menu} />
        <Route path="/etherscan" component={Etherscan} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
    </SnackbarProvider>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
