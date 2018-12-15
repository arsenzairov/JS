import React, { Component } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar as Bar } from "react-native-elements";

const SearchBar = props => {
  const { onChange } = props;

  return (
    <View
      style={{
        height: 80,
        backgroundColor: "",
        justifyContent: "center",
        paddingHorizontal: 10
      }}
    >
      <Bar
        round
        onChangeText={onChange}
        onClearText={onChange}
        icon={{ type: "font-awesome", name: "search" }}
        placeholder="Type Here..."
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
