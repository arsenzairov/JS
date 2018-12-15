import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar
} from "react-native";

// Navigator Imports
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

// Redux Staff
import { store } from "./redux/store";
import { Provider } from "react-redux";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import MainScreen from "./screens/MainScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import StockDetailsScreen from "./screens/StockDetailsScreen";
import HotStocksScreen from "./screens/HotStocksScreen";

// Components
import NewsDetails from "./components/NewsDetails";
import LoginScreen from "./components/LoginPage";

const MainStack = createStackNavigator(
  {
    StockDetails: StockDetailsScreen,
    Explore: MainScreen,
    NewsDetails: NewsDetails,
    HotStocks: HotStocksScreen
  },
  {
    initialRouteName: "Explore",

    headerMode: "none"
  }
);

const SearchStack = createStackNavigator(
  {
    StockDetails: StockDetailsScreen,
    Search: SearchScreen
  },
  {
    initialRouteName: "Search",
    headerMode: "none"
  }
);

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const MainTabs = createBottomTabNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        tabBarLabel: "Explore",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={`ios-home`} size={25} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={25} color={tintColor} />
        )
      }
    },
    Portfolio: {
      screen: PortfolioScreen,
      navigationOptions: {
        tabBarLabel: "Portfolio",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-paper" size={25} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={`ios-person`} size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const AppNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  Main: MainTabs
});

const Container = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
