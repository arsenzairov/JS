import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Constants } from "expo";
import NewsScreen from "./NewsScreen";
import HotStocksScreen from "./HotStocksScreen";

import { Container, Header, Content, Spinner } from "native-base";

import { connect } from "react-redux";

class MainScreen extends React.Component {
  static navigationOptions = {
    headerMode: "none"
  };

  render() {
    console.log("NEWS LOADING" + this.props.newsloading);

    if (this.props.newsloading === true) {
      return (
        <Container style={{ backgroundColor: "#003366" }}>
          <Header />
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[0, 1, 2]}
        automaticallyAdjustContentInsets={true}
      >
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <Icon name="ios-menu" size={20} />
            <TextInput
              placeholder="Search For Your Stocks"
              placeholderTextColor="black"
              style={{
                marginLeft: 10,
                fontWeight: "700",
                flex: 1,
                backgroundColor: "white"
              }}
            />
            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
            <Icon name="ios-contacts" size={20} />
          </View>
        </View>

        <View style={styles.newsDisplay}>
          <NewsScreen
            onLoad={this.onNewsLoad}
            navigation={this.props.navigation}
          />
        </View>

        <View style={styles.hotStocksDisplay}>
          <HotStocksScreen
            onLoad={this.onHotStocksLoad}
            navigation={this.props.navigation}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#44516b"
  },
  newsDisplay: {
    padding: 10,
    height: 380,
    marginTop: -10
  },
  headerContainer: {
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 1
  },
  hotStocksDisplay: {
    padding: 8
  }
});

const mapStateToProps = state => ({
  newsloading: state.newsInfo.loading,
  hotStocksloading: state.stocks.hotStocksLoading
});

export default connect(
  mapStateToProps,
  null
)(MainScreen);
