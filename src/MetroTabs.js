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
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.screenList}
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
            <View style={styles.screenContainer}>{item.screen}</View>
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        <Animated.View
          style={[
            styles.tabContainer,
            { transform: [{ translateX: this.state.headerOffset }] }
          ]}
        >
          {this.props.screens.map(item => {
            return (
              <TouchableOpacity onPress={() => this.headerPress(item)}>
                <Text
                  style={[
                    styles.tabText,
                    { width: this.HEADER_WIDTH },
                    this.state.currentPage === item.key && styles.tabTextActive
                  ]}
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
    paddingTop: 120,
    backgroundColor: "black"
  },
  screenContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width - 20
  },
  screenList: {
    paddingEnd: 20
  },
  tabContainer: {
    position: "absolute",
    top: 0,
    flexDirection: "row"
  },
  tabText: {
    color: "white",
    padding: 10,
    marginTop: 20,
    fontSize: 50,
    opacity: 0.4
  },
  tabTextActive: {
    opacity: 1
  }
});
