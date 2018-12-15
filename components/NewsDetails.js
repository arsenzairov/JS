import React, { Component } from "react";

import { Text, View, StyleSheet, Image } from "react-native";

const NewsDetails = props => {
  const { item } = props;

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          margin: 5
        }}
        numberOfLines={2}
      >
        {" "}
        {item.title}
      </Text>
      <Image
        style={{
          flex: 4,
          height: null,
          width: null,
          margin: 5
        }}
        source={{
          uri: item.urlToImage
            ? item.urlToImage
            : "https://dubsism.files.wordpress.com/2017/12/image-not-found.png"
        }}
      />
      <Text
        style={{
          marginLeft: 5,
          flex: 1,
          fontWeight: "bold",
          fontSize: 15
        }}
      >
        {item.description}
      </Text>
      <Text numberOfLines={2} style={{ marginLeft: 5, flex: 2, color: "grey" }}>
        {" "}
        Majority Leader Mitch McConnell on Tuesday after a meeting of Republican
        senators. Credit Gabriella{" "}
      </Text>
    </View>
  );
};

export default NewsDetails;
