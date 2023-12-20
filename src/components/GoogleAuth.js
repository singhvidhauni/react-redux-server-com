import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    // Load the Google API client library
    if (window.gapi) {
      window.gapi.load("auth2", this.initClient);
    }
  }

  initClient = () => {
    console.log("init called....", process.env.REACT_APP_GOOGLE_CLIENT_ID);
    // Initialize the Google API client with your client ID
    window.gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "email profile", // Add additional scopes as needed
      plugin_name: "chat",
      prompt: "consent",
    });
    window.gapi.auth2
      .getAuthInstance()
      .isSignedIn.listen(this.updateSignInStatus);
  };

  updateSignInStatus = (isSignedIn) => {
    console.log("signed in succesfully ..", isSignedIn);
    console.log(
      "google id:",
      window.gapi.auth2.getAuthInstance().currentUser.get().getId()
    );
    if (isSignedIn) {
      this.props.signIn(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      );
    } else {
      console.log("User is Logged Out!");
      this.props.signOut();
    }
  };

  handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  renderGoogleLogin = () => {
    return this.props.isSignedIn ? (
      <button
        onClick={this.handleSignOutClick}
        className="ui red google button small"
      >
        <i className="google icon" />
        Sign Out
      </button>
    ) : (
      <button
        onClick={this.handleSignInClick}
        className="ui blue google button small"
      >
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  };

  render() {
    return (
      <div>
        <div className="ui horizontal hidden divider">
          {this.renderGoogleLogin()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
