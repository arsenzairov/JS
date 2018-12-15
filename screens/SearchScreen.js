import React, { Component } from "react";
import { View } from "react-native";

import { Constants } from "expo";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";

import { connect } from "react-redux";

import { fetchPattern } from "../redux/actions/stockaction";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
  }

  onChange = text => {
    this.props.fetchPattern(text);
  };

  onClick = stock => {
    this.props.navigation.navigate("StockDetails", {
      symbol_name: stock["1. symbol"]
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "#001a33"
        }}
      >
        <SearchBar onChange={this.onChange} />
        <StockList pattern={this.props.pattern} onClick={this.onClick} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pattern: state.stocks.pattern
});

export default connect(
  mapStateToProps,
  { fetchPattern: fetchPattern }
)(SearchScreen);
