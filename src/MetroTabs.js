/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";

export default class MetroTabs extends Component {
  WINDOW_WIDTH = Dimensions.get("window").width;
  HEADER_WIDTH = this.WINDOW_WIDTH / 1.7;

  state = {
    currentPage: "1",
    headerOffset: new Animated.Value(0)
  };

  render() {
    console.log(this.props.screens);
    return (
      <View style={{ paddingTop: 120, backgroundColor: "black" }}>
        <FlatList
          contentContainerStyle={{ paddingEnd: 20 }}
          ref={screenList => (this.screenList = screenList)}
          horizontal
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          snapToInterval={this.WINDOW_WIDTH - 10}
          data={this.props.screens}
          scrollEventThrottle={50}
          onScroll={this.handleScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.container}>{item.screen}</View>
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            flexDirection: "row",
            transform: [{ translateX: this.state.headerOffset }]
          }}
        >
          {this.props.screens.map(item => {
            return (
              <TouchableOpacity onPress={() => this.headerPress(item)}>
                <Text
                  style={{
                    color: "white",
                    padding: 10,
                    width: this.HEADER_WIDTH,
                    marginTop: 20,
                    fontSize: 50,
                    opacity: this.state.currentPage === item.key ? 1 : 0.4
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  }

  handleScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }) => {
    const { headerOffset } = this.state;
    const toValue = (x * this.HEADER_WIDTH) / -this.WINDOW_WIDTH;
    headerOffset.stopAnimation();
    Animated.timing(headerOffset, {
      toValue,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  onViewableItemsChanged = info => {
    if (info.viewableItems.length >= 1) {
      this.setState({ currentPage: info.viewableItems[0].key });
      console.log("scrolling to ", info.viewableItems[0].index);
    }
  };

  headerPress = item => {
    this.setState({ currentPage: item.key });
    this.screenList.scrollToItem({ item: { key: item } });
  };
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width - 20
  }
});
