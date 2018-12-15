import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

import { Right, CardItem, Card } from "native-base";

const HotStocks = props => {
  const { hotStocks, onSelect } = props;

  return (
    <Card style={{ height: 275 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <CardItem
          header
          style={{ borderBottomWidth: 1, borderBottomColor: "#dee0e2" }}
        >
          <Text> Hot Stocks For Today </Text>
        </CardItem>
        {hotStocks !== undefined &&
          hotStocks.slice(0, 10).map((item, key) => (
            <CardItem key={key}>
              <View>
                <TouchableHighlight onPress={() => onSelect(item)}>
                  <Image
                    style={{ height: 90, width: 90 }}
                    source={{ uri: `https://logo.clearbit.com/${item[8]}` }}
                  />
                </TouchableHighlight>
              </View>
              <Right
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  height: 90,
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ marginTop: 5 }}> {item[3]} </Text>
                <Text style={{ marginTop: 5, color: "grey", fontSize: 11 }}>
                  {" "}
                  Industry {item[14]}{" "}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#c4402f"
                  }}
                >
                  {" "}
                  {item[10]}
                </Text>
              </Right>
            </CardItem>
          ))}
      </ScrollView>
    </Card>
  );
};

export default HotStocks;
