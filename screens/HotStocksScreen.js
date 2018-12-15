import React from "react";

import HotStocks from "../components/HotStocks";

import { connect } from "react-redux";

import { getHotStocks } from "../redux/actions/stockaction";

class HotStocksScreen extends React.Component {
  state = {
    stocks: []
  };

  componentDidMount() {
    this.props.getHotStocks();
  }

  onSelectHotStock = stock => {
    this.props.navigation.navigate("StockDetails", {
      symbol_name: stock
    });
  };

  render() {
    const stocks =
      this.props.hotStocks !== undefined ? this.props.hotStocks : [];

    return <HotStocks hotStocks={stocks} onSelect={this.onSelectHotStock} />;
  }
}

const mapStateToProps = state => ({
  hotStocks: state.stocks.hotStocks
});

export default connect(
  mapStateToProps,
  { getHotStocks: getHotStocks }
)(HotStocksScreen);
