import React, { Component } from "react";

import {
  Button,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { addUser, setActiveUser } from "../redux/actions/useraction";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: "",
    password: "",
    isFormWrong: "false",
    isPasswordWrong: "false",
    width: 0
  };

  componentDidMount() {
    AsyncStorage.getItem("@stock_final_project:username").then(username => {
      this.setState({ username });
    });
  }
  // returns a hashcode number
  hashCode = username => {
    return username.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  onUserNameChange = username => {
    this.setState({
      username
    });
  };

  onPasswordChange = password => {
    this.setState({
      password
    });
  };

  createUser = (username, password) => {
    return {
      username: username,
      password: password,
      virtualMoney: 10000,
      portfolioValue: 0,
      numOfStocks: 0,
      portfolio: []
    };
  };

  validate = (username, password) => {
    if (username.length == 0 && password.length == 0) {
      this.setState({ isFormWrong: true });
      return;
    } else {
      this.setState({ isFormWrong: false });
    }
  };

  checkUserExist = (hashCode, password) => {
    const users = this.props.users;

    if (users[hashCode] && users[hashCode].password !== password) {
      this.setState({ isPasswordWrong: true });
      return false;
    } else if (users[hashCode] && users[hashCode].password === password) {
      return true;
    } else return true;
  };

  _login = () => {
    const { username, password } = this.state;
    const hash = this.hashCode(username);

    this.validate(username, password);
    const { isFormWrong } = this.state;
    if (isFormWrong === true) {
      return;
    }

    const checkUserDoesNotExist = this.checkUserExist(hash, password);

    if (checkUserDoesNotExist) {
      AsyncStorage.setItem("@stock_final_project:username", username);
      const newuser = this.createUser(username, password);
      this.props.addUser(hash, newuser);
      this.setState({ isFormWrong: false, isPasswordWrong: false });
      this.props.navigation.navigate("Explore");
    } else {
      this.props.setActiveUser(hash);
      this.props.navigation.navigate("Explore");
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: "rgb(32,53,70)",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
          onLayout={event => {
            this.setState({
              width: event.nativeEvent.layout.width
            });
          }}
        >
          <Image
            source={require("../assets/MILLION_STOCK.png")}
            resizeMode="contain"
            style={{
              opacity: 0.6,
              width: this.state.width / 2.0,
              height: this.state.width / 2.0,
              maxHeight: 200,
              maxWidth: 200
            }}
          />
        </View>

        <View
          style={{
            height: 200,
            width: this.state.width / 1.25,
            padding: 20,
            marginLeft: 40,
            marginTop: 10
          }}
        >
          {this.state.isFormWrong === true ? (
            <TouchableHighlight
              style={{
                height: 36,
                width: 300,
                backgroundColor: "red",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                {" "}
                The Username or Password cannot be empty{" "}
              </Text>
            </TouchableHighlight>
          ) : (
            <View />
          )}

          {this.state.isPasswordWrong === true ? (
            <TouchableHighlight
              style={{
                height: 36,
                width: 300,
                backgroundColor: "red",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                {" "}
                The Username or Password cannot be empty{" "}
              </Text>
            </TouchableHighlight>
          ) : (
            <View />
          )}

          <TextInput
            onChangeText={this.onUserNameChange}
            style={{
              height: 40,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#FFF",
              marginBottom: 20,
              paddingHorizontal: 10
            }}
            placeholder="Enter username"
            placeholderTextColor="rgba(255,255,255,0.8)"
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
          />

          <TextInput
            onChangeText={this.onPasswordChange}
            style={{
              height: 40,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#FFF",
              marginBottom: 20,
              paddingHorizontal: 10
            }}
            placeholder="Enter password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            secureTextEntry
            returnKeyType="go"
            autoCorrect={false}
          />

          <TouchableHighlight
            style={{
              height: 36,
              width: 160,
              borderRadius: 18,
              marginLeft: "20%",
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center"
            }}
          >
            <Button color="white" onPress={this._login} title="Submit" />
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { addUser: addUser }
)(LoginPage);
