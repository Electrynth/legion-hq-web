import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from 'context/DataContext';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import auth from 'constants/auth';
const { domain, clientID } = auth.v1;
const { returnTo } = auth.prod;


ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={returnTo}
    >
      <DataProvider>
        <App />
      </DataProvider>
    </Auth0Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
