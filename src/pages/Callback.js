import React from 'react';
import { Redirect } from 'react-router-dom';
import auth0Client from 'utility/Auth';
import LoadingWidget from 'common/LoadingWidget';

class Callback extends React.Component {
  state = { doneAuthenticating: false };

  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.setState({ doneAuthenticating: true });
  }

  render() {
    const { doneAuthenticating } = this.state;
    return (
      <div>
        {doneAuthenticating ? <Redirect to="/" /> : <LoadingWidget />}
      </div>
    );
  }
}

export default Callback;
