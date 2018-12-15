import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableHighlight
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const ProfilePage = props => {
  const HEADER_MAX_HEIGHT = 170;
  const HEADER_MIN_HEIGHT = 70;
  const PROFILE_IMAGE_MAX_HEIGHT = 90;
  const PROFILE_IMAGE_MIN_HEIGHT = 40;

  const { user } = props;

  return (
    <View style={{ flex: 1, backgroundColor: "#44516b" }}>
      <View
        style={{
          backgroundColor: "lightblue",
          height: HEADER_MAX_HEIGHT
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 40,
              marginRight: 30
            }}
          >
            <TouchableHighlight>
              <Ionicons name={`ios-settings`} size={25} color="black" />
            </TouchableHighlight>
          </View>
          <View
            style={{
              height: PROFILE_IMAGE_MAX_HEIGHT,
              width: PROFILE_IMAGE_MAX_HEIGHT,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: "white",
              borderWidth: 3,
              overflow: "hidden",
              marginLeft: "40%"
            }}
          >
            <Image
              style={{ flex: 1, width: null, height: null }}
              source={{
                uri:
                  "http://www.softball.org.au/wp-content/uploads/2017/05/no-profile-image.png"
              }}
            />
          </View>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 26, paddingLeft: 26 }}
            />
          </View>
        </View>
      </View>

      <View style={{ height: 200, backgroundColor: "white" }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
              marginTop: 5
            }}
          >
            {" "}
            {user.username}{" "}
          </Text>
          <Text style={{ fontSize: 15, color: "grey", marginTop: 5 }}>
            {" "}
            United States{" "}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30
          }}
        >
          <View
            style={{
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
              {user.numOfStocks}
            </Text>
            <Text style={{ color: "grey", fontSize: 15 }}> Stocks </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginLeft: 25,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
              {user.virtualMoney.toFixed(1)}{" "}
            </Text>
            <Text style={{ color: "grey", fontSize: 15 }}> Money Left </Text>
          </View>
          <View
            style={{
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
              {" "}
              {user.portfolioValue.toFixed(1)}{" "}
            </Text>
            <Text style={{ color: "grey", fontSize: 15 }}>
              {" "}
              Portfolio Value{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;
