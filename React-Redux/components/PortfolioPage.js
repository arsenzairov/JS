import React, { Component } from "react";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Thumbnail,
  Title,
  SwipeRow,
  Icon
} from "native-base";

import { Constants } from "expo";

import { Image } from "react-native";

const PortfolioPage = props => {
  const { portfolio } = props;

  return (
    <Container
      style={{
        backgroundColor: "#44516b"
        // paddingTop: Constants.statusBarHeight
      }}
    >
      <Header style={{ justifyContent: "center", alignItems: "center" }}>
        <Left />
        <Body>
          <Title> Portfolio </Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <List>
          {portfolio !== undefined &&
            portfolio.map((item, key) => (
              <ListItem
                key={key}
                thumbnail
                style={{
                  marginTop: 15,

                  backgroundColor: "#67818a",
                  marginLeft: 0
                }}
              >
                {/* <Left style={{ marginLeft: 10 }}>
                  <Text> Shares: ${item.shares}</Text> */}
                <Left />
                <Body>
                  <Text
                    style={{ fontSize: 18, color: "white", fontWeight: "800" }}
                  >
                    {item.symbol} : {item.shares} shares{" "}
                  </Text>

                  {item.percentage == "increase" ? (
                    <Text
                      style={{ fontSize: 15, color: "white" }}
                      note
                      numberOfLines={1}
                    >
                      {" "}
                      {`Increase ${item.percentageAmount}%`}{" "}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontSize: 15, color: "white" }}
                      note
                      numberOfLines={1}
                    >
                      {" "}
                      {`Decrease ${item.percentageAmount}%`}{" "}
                    </Text>
                  )}
                </Body>
                <Right>
                  {item.percentage == "increase" ? (
                    <Text
                      style={{
                        height: 40,
                        fontSize: 18,
                        marginRight: 3,
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "green",
                        borderRadius: 20,
                        paddingTop: 10
                      }}
                    >
                      {" "}
                      +${parseFloat(item.close).toFixed(2)}{" "}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        height: 40,
                        fontSize: 18,
                        paddingTop: 10,
                        marginRight: 3,
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#cc0000",
                        borderRadius: 5
                      }}
                    >
                      {" "}
                      -${parseFloat(item.close).toFixed(2)}{" "}
                    </Text>
                  )}
                </Right>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  );
};

export default PortfolioPage;
