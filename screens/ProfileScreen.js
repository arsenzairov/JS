import React, { Component } from "react";
import { Text } from "react-native";

import { connect } from "react-redux";

import ProfilePage from "../components/ProfilePage";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { active, users } = this.props;

    const active_user = users[active];

    return <ProfilePage user={active_user} />;
  }
}

const mapStateToProps = state => ({
  active: state.users.active,
  users: state.users
});

export default connect(mapStateToProps)(ProfileScreen);
