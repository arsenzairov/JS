import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import NewsDetails from "./NewsDetails";

const NewsFeed = props => {
  const { news } = props;

  return (
    <Swiper
      key={news ? news : 0}
      autoplay={true}
      style={styles.swiperContainer}
      playInBackground={true}
    >
      {news && news.length !== 0 ? (
        news.map((item, key) => <NewsDetails key={key} item={item} />)
      ) : (
        <Text> </Text>
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: 375,
    backgroundColor: "white"
  }
});

export default NewsFeed;
