import auth0 from 'auth0-js';
import auth from 'constants/auth';

const { returnTo, redirectUri } = auth.prod;
const { domain, audience, clientID } = auth.v1;

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      redirectUri, domain, audience, clientID,
      responseType: 'id_token',
      scope: 'openid profile email',
      expires_in: 36 * 60 * 60 * 1000 // 36 hours
    });
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.silentAuth = this.silentAuth.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getEmail() { return this.profile.email; }

  getName() { return this.profile.name; }

  getProfile() { return this.profile; }

  getIdToken() { return this.idToken; }

  isAuthenticated() { return new Date().getTime() < this.expiresAt; }

  signIn() { this.auth0.authorize(); }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    });
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({ returnTo, clientID });
  }
}

const auth0Client = new Auth();

export default auth0Client;
