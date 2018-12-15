import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

import PortfolioPage from "../components/PortfolioPage";

class PortfolioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { active, users } = this.props;

    const active_user = users[active];
    const portfolio = active_user.portfolio;

    return <PortfolioPage portfolio={portfolio} />;
  }
}

const mapStateToProps = state => ({
  active: state.users.active,
  users: state.users
});

export default connect(
  mapStateToProps,
  null
)(PortfolioScreen);
