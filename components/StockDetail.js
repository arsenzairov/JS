import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import DialogInput from "react-native-dialog-input";
import { Container, Header, Content, Spinner } from "native-base";
import Dialog, {
  DialogButton,
  DialogTitle,
  DialogContent
} from "react-native-popup-dialog";

import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";

import { Constants } from "expo";

import { Dimensions } from "react-native";

class StockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogInputVisible: false,
      isDialogVisible: false,
      shares: 0,
      action: "",
      overallPrice: 0,
      indexOfSmallest: 0
    };
  }

  generateArrayOfClosed = data => {
    const keys = Object.keys(data);

    const newArr = keys.map((key, index) => {
      const closed = parseFloat(data[key]["4. close"]);
      return closed;
    });

    return newArr;
  };

  onDialogPress = shares => {
    const { stockInformation } = this.props;
    const price =
      stockInformation[Object.keys(stockInformation)[0]]["4. close"];

    const overallPrice = (shares * price).toFixed(2);

    this.setState({
      shares: shares,
      isDialogInputVisible: false,
      isDialogVisible: true,
      overallPrice
    });
  };

  onClick = () => {
    const { stockInformation, symbol } = this.props;
    const shares = this.state.shares;
    this.setState({ isDialogVisible: false, action: "", shares: 0 });
    this.props.buy(symbol, stockInformation, shares);
  };

  onSell = () => {
    const { stockInformation, symbol } = this.props;
    const shares = this.state.shares;
    this.setState({ isDialogVisible: false, action: "", shares: 0 });
    this.props.sell(symbol, stockInformation, shares);
  };

  onBackPress = () => {
    this.props.onBackClick();
  };

  render() {
    const {
      symbol,
      stockInformation,
      percentage,
      percentageAmount,
      currentShares
    } = this.props;

    const data = this.generateArrayOfClosed(stockInformation);

    const axesSvg = { fontSize: 10, fill: "white" };
    const verticalContentInset = { top: 10, bottom: 10 };

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            paddingTop: 10
          }}
        >
          <View style={{ position: "absolute", top: 20, left: 20 }}>
            <TouchableHighlight
              onPress={this.onBackPress}
              style={{
                borderRadius: 18,
                borderColor: "grey",
                borderWidth: 1.5,
                width: 40,
                backgroundColor: "#ADD8E6",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="ios-arrow-back" size={25} color="white" />
            </TouchableHighlight>
          </View>

          <Text style={{ fontSize: 18, fontWeight: "600", color: "#D3D3D3" }}>
            {symbol}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 40,
              color: "white",
              fontWeight: "bold"
            }}
          >
            {" "}
            {stockInformation.length != 0 &&
              stockInformation[Object.keys(stockInformation)[0]][
                "4. close"
              ]}{" "}
          </Text>

          {percentage === "decrease" ? (
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: "red"
              }}
            >
              {" "}
              DECR %{percentageAmount}{" "}
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: "#32CD32"
              }}
            >
              {" "}
              INCR %{percentageAmount}{" "}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
            backgroundColor: "#0059b3",
            alignItems: "center"
          }}
        >
          <Text style={{ marginLeft: 20, color: "white" }}> Chart </Text>
          <Text style={{ color: "white" }}> More Info </Text>
          <Text style={{ marginRight: 20, color: "white" }}>
            {" "}
            Market Depth{" "}
          </Text>
        </View>
        <View
          style={{
            height: 130,
            flexDirection: "row",
            backgroundColor: "#00264d",
            padding: 12,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 2 - 20,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Volume{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "6. volume"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                High{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "2. high"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Close{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "4. close"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Divident Amount{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "7. dividend amount"
                  ]}{" "}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get("window").width / 2 - 20,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Open{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "1. open"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "gray", fontWeight: "600" }}>
                {" "}
                Low{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "3. low"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Adjusted Close{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "5. adjusted close"
                  ]}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
                {" "}
                Split coefficient{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {" "}
                {stockInformation.length != 0 &&
                  stockInformation[Object.keys(stockInformation)[0]][
                    "8. split coefficient"
                  ]}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 400,
            padding: 20,
            flexDirection: "row"
          }}
        >
          <YAxis
            data={data}
            style={{ marginBottom: 40 }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={data}
              contentInset={verticalContentInset}
              svg={{ stroke: "rgb(243,247,253)" }}
            >
              <Grid />
            </LineChart>
          </View>
        </View>

        <View
          style={{
            flex: 1
          }}
        >
          <Dialog
            visible={this.state.isDialogVisible}
            onTouchOutside={() => {
              this.setState({
                isDialogVisible: false,
                action: "",
                overallPrice: 0
              });
            }}
            width={0.9}
            actions={[
              <DialogButton
                text="Cancel"
                onPress={() => {
                  this.setState({
                    isDialogVisible: false,
                    action: "",
                    overallPrice: 0
                  });
                }}
                key="button-1"
              />,
              <DialogButton
                text={this.state.action}
                onPress={
                  this.state.action === "Buy" ? this.onClick : this.onSell
                }
                key="button-2"
              />
            ]}
          >
            <View
              style={{
                height: 200,
                paddingLeft: 18,
                paddingRight: 18,
                backgroundColor: "#8aacb8"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontWeight: "bold",
                      marginLeft: 10
                    }}
                  >
                    {" "}
                    {this.state.shares}{" "}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginLeft: 10
                    }}
                  >
                    {" "}
                    Number of Shares{" "}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontWeight: "bold",
                      marginRight: 10
                    }}
                  >
                    {" "}
                    {this.state.overallPrice}{" "}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginRight: 10
                    }}
                  >
                    {" "}
                    Total Price{" "}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderColor: "black",
                  borderTopWidth: 1,
                  marginTop: 20,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 10
                  }}
                >
                  {" "}
                  New Position{" "}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 10
                  }}
                >
                  {" "}
                  {parseFloat(this.state.shares) + currentShares}{" "}
                </Text>
              </View>

              <View
                style={{
                  borderColor: "black",
                  borderTopWidth: 1,
                  marginTop: 1,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 10
                  }}
                >
                  Execution Price
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 10
                  }}
                >
                  {stockInformation.length != 0 &&
                    stockInformation[Object.keys(stockInformation)[0]][
                      "4. close"
                    ]}
                </Text>
              </View>
            </View>
          </Dialog>
        </View>

        <DialogInput
          modalStyle={true}
          isDialogVisible={this.state.isDialogInputVisible}
          title={symbol}
          message={"Enter the number of shares"}
          hintInput={"1"}
          submitInput={inputText => {
            this.onDialogPress(inputText);
          }}
          closeDialog={() => {
            this.setState({ isDialogInputVisible: false, action: "" });
          }}
        />

        <View
          style={{
            // position: "absolute",
            // bottom: 0,
            width: Dimensions.get("window").width,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <TouchableHighlight
            style={{
              height: 36,
              width: 160,
              borderRadius: 18,
              borderColor: "red",
              borderWidth: 1.5,
              marginLeft: 10
            }}
          >
            <Button
              title="SELL"
              color="#D82010"
              accessibilityLabel="Learn more about this button"
              onPress={() =>
                this.setState({ isDialogInputVisible: true, action: "Sell" })
              }
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              height: 36,
              width: 160,
              borderRadius: 18,
              borderColor: "#32CD32",
              borderWidth: 1.5,
              marginLeft: 15
            }}
          >
            <Button
              title="BUY"
              color="#32CD32"
              accessibilityLabel="Learn more about this button"
              onPress={() =>
                this.setState({ isDialogInputVisible: true, action: "Buy" })
              }
            />
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#003366"
  }
});

export default StockDetail;
