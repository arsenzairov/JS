import React, { Component } from "react";
import StockDetail from "../components/StockDetail";
import { connect } from "react-redux";

import { addStock, sellStock } from "../redux/actions/stockaction";
import { getStockDetails } from "../redux/actions/stockaction";

import { Container, Header, Spinner, Content } from "native-base";

import { Text, View } from "react-native";

class StockDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const symbol = Array.isArray(this.props.navigation.getParam("symbol_name"))
      ? this.props.navigation.getParam("symbol_name")[1]
      : this.props.navigation.getParam("symbol_name");

    this.props.getStockDetails(symbol);
  }

  onBackClick = () => {
    this.props.navigation.goBack();
  };

  calculateCurrentValue = (price, shares) => {
    return price * shares;
  };

  _sell = (symbol, stock, shares = 1) => {
    const sharesConverted = parseFloat(shares);
    const lastClosedPrice = stock[Object.keys(stock)[0]]["4. close"];

    const stockInfo = {
      symbol: symbol,
      close: lastClosedPrice,
      shares: sharesConverted
    };

    this.props.sellStock(stockInfo);
    this.props.navigation.goBack();
  };

  _buy = (symbol, stock, shares = 1) => {
    const sharesConverted = parseFloat(shares);
    const lastClosedPrice = stock[Object.keys(stock)[0]]["4. close"];
    const comeAfterClosedPrice = stock[Object.keys(stock)[1]]["4. close"];

    const difference = this.calculateDiff(
      lastClosedPrice,
      comeAfterClosedPrice
    );

    const currentValueOfStock = this.calculateCurrentValue(
      lastClosedPrice,
      sharesConverted
    );

    const stockInfo = this.generateStockInfo(
      symbol,
      stock,
      difference.percentage,
      difference.percentageAmount,
      currentValueOfStock,
      sharesConverted
    );

    this.props.addStock(stockInfo);
    this.props.navigation.goBack();
  };

  calculateDiff = (newVal, oldVal) => {
    const num = newVal - oldVal;

    if (num > 0) {
      const percIncr = (num / oldVal) * 100;
      return {
        percentage: "increase",
        percentageAmount: percIncr.toFixed(2)
      };
    } else {
      const decrNum = oldVal - newVal;
      const decrPerc = (decrNum / oldVal) * 100;
      return {
        percentage: "decrease",
        percentageAmount: decrPerc.toFixed(2)
      };
    }
  };

  generateStockInfo = (
    symbol,
    stock,
    percentage,
    percentageAmount,
    currentValueOfStock,
    numOfShares
  ) => {
    return {
      symbol: symbol,
      close: stock[Object.keys(stock)[0]]["4. close"],
      percentage: percentage,
      percentageAmount: percentageAmount,
      currentValueOfStock: currentValueOfStock,
      shares: numOfShares
    };
  };

  getCurrentShares = (symbol, portfolio) => {
    let Currshares = 0;

    portfolio.forEach(stock => {
      if (stock.symbol === symbol) {
        Currshares = stock.shares;
      }
    });

    return Currshares;
  };

  render() {
    const { symbol, stockInformation, loading, error } = this.props.stockInfo;

    const difference =
      stockInformation.length !== 0
        ? this.calculateDiff(
            stockInformation[Object.keys(stockInformation)[0]]["4. close"],
            stockInformation[Object.keys(stockInformation)[1]]["4. close"]
          )
        : 0;

    const { active, users } = this.props;
    const active_user = users[active];
    const portfolio = active_user.portfolio;

    const currentShares = this.getCurrentShares(symbol, portfolio);

    if (stockInformation === undefined || stockInformation.length === 0) {
      return (
        <Container style={{ backgroundColor: "#003366" }}>
          <Header />
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    } else {
      return (
        <StockDetail
          symbol={symbol}
          currentShares={currentShares}
          stockInformation={stockInformation}
          loading={loading}
          error={error}
          percentage={difference.percentage}
          percentageAmount={difference.percentageAmount}
          onBackClick={this.onBackClick}
          buy={this._buy}
          sell={this._sell}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  stockInfo: state.currentStock,
  active: state.users.active,
  users: state.users
});

export default connect(
  mapStateToProps,
  { addStock: addStock, getStockDetails: getStockDetails, sellStock: sellStock }
)(StockDetailsScreen);
