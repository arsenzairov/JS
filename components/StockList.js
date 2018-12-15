import { Text, View, TouchableHighlight, ScrollView } from "react-native";
import React, { Component } from "react";

const StockList = props => {
  const { pattern, onClick } = props;

  return (
    <ScrollView>
      {pattern !== undefined &&
        pattern.map((item, key) => (
          <TouchableHighlight
            onPress={() => onClick(item)}
            key={key}
            style={{
              backgroundColor: "#001a33",
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              marginTop: 4,
              borderBottomColor: "white"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  {" "}
                  {item["1. symbol"]}{" "}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {" "}
                  {item["2. name"]}{" "}
                </Text>
              </View>

              {/* <Text
                style={{
                  fontSize: 18,
                  marginTop: 3,
                  marginBottom: 4,
                  marginRight: 3,
                  color: "white",
                  fontWeight: "bold",
                  borderWidth: 2,
                  backgroundColor: "green",
                  borderRadius: 5
                }}
              >
                {" "}
                +42.28{" "}
              </Text> */}
            </View>
          </TouchableHighlight>
        ))}
    </ScrollView>
  );
};

export default StockList;
