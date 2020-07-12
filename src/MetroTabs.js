import React, { useRef, useCallback } from "react";
import Animated from "react-native-reanimated";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

// header width is 1.7 times smaller than the screen
const HEADER_ITEM_WIDTH = SCREEN_WIDTH / 1.7;

// slightly smaller snap to value to make the next screen peep out
const SCREEN_SNAP_INTERVAL = SCREEN_WIDTH - 20;

/**
 * @param {Object} props
 * @param {Array} props.screens
 */
const MetroTabs = (props) => {
  const { screens } = props;

  const scrollViewRef = useRef(null);

  // main animated node
  // everything else is interpolated on this node
  const scrollViewX = useValue(0);

  // onScroll boilerplate from redash
  const onScroll = onScrollEvent({ x: scrollViewX });

  // does the actual parallax interpolation
  const headerX = Animated.interpolate(scrollViewX, {
    // max scrolled value for scroll-view
    inputRange: [0, SCREEN_SNAP_INTERVAL * screens.length],
    // max parallax translate for the header
    // negative because the header is translated to the left
    outputRange: [0, HEADER_ITEM_WIDTH * screens.length * -1],
  });

  // scrolls to the correct screen when one of the tabs are pressed
  const onTabPress = useCallback(async (index) => {
    scrollViewRef.current
      ?.getNode()
      .scrollTo({ x: index * SCREEN_SNAP_INTERVAL, animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        bounces={false}
        {...{ onScroll }}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        snapToInterval={SCREEN_SNAP_INTERVAL}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.screenList}
      >
        {screens.map((item) => (
          <View style={styles.screenContainer}>{item.screen}</View>
        ))}
      </Animated.ScrollView>
      <Animated.View
        style={[styles.tabContainer, { transform: [{ translateX: headerX }] }]}
      >
        {screens.map((item, index) => (
          <HeaderItem
            item={item}
            index={index}
            onPress={onTabPress}
            maxLen={screens.length}
            scrollViewX={scrollViewX}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const activeColor = "#ffffff";
const inActiveColor = "#333333";

const HeaderItem = ({ item, index, maxLen, scrollViewX, onPress }) => {
  const color = interpolateColor(scrollViewX, {
    // array of snap intervals
    inputRange: new Array(maxLen)
      .fill(0)
      .map((_, i) => SCREEN_SNAP_INTERVAL * i),

    // generate a color array with active color in the index position
    outputRange: new Array(maxLen)
      .fill(0)
      .map((_, i) => (i === index ? activeColor : inActiveColor)),
  });

  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <Animated.Text style={[styles.tabText, { color }]}>
        {item.title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    backgroundColor: "black",
  },
  screenContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_SNAP_INTERVAL,
  },
  screenList: {
    paddingEnd: 20,
  },
  tabContainer: {
    top: 8,
    position: "absolute",
    flexDirection: "row",
  },
  tabText: {
    padding: 10,
    fontSize: 50,
    marginTop: 20,
    width: HEADER_ITEM_WIDTH,
  },
  tabTextActive: {
    opacity: 1,
  },
});

export default MetroTabs;
