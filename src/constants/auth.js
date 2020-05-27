const auth = {
  v1: {
    domain: 'dev-i-uenm-b.auth0.com',
    audience: 'https://dev-i-uenm-b.auth0.com/userinfo',
    clientID: 'lD7NO1LrFyHlaMY0oHQoCb7s6MblhVrl'
  },
  v2: {
    domain: 'legion-hq-login.auth0.com',
    audience: 'https://legion-hq-login.auth0.com/userinfo',
    clientID: '4LIptO8NBFnPepfS8mxVxjFRNUljZHmZ'
  },
  dev: {
    redirectUri: 'http://localhost:3000/callback',
    returnTo: 'http://localhost:3000'
  },
  prod: {
    redirectUri: 'https://d37xhki8rk4762.cloudfront.net/callback',
    returnTo: 'https://d37xhki8rk4762.cloudfront.net'
  }
};

export default auth;
