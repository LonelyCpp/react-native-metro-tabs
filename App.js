/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends Component {
  WINDOW_WIDTH = Dimensions.get('window').width;
  HEADER_WIDTH = this.WINDOW_WIDTH / 1.5;

  state = {
    currentPage: '1'
  };

  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          ref={headerList => (this.headerList = headerList)}
          style={{ position: 'absolute', top: 0, right: 0 }}
          horizontal
          snapToAlignment={'center'}
          decelerationRate={0}
          snapToInterval={Dimensions.get('window').width}
          data={[{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }]}
          renderItem={({ item }) => (
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                width: this.HEADER_WIDTH,
                marginTop: 50,
                fontSize: 30,
                opacity: this.state.currentPage === item.key ? 1 : 0.4
              }}
            >
              Some header {item.key}
            </Text>
          )}
        />
        <FlatList
          ref={screenList => (this.screenList = screenList)}
          horizontal
          snapToAlignment={'center'}
          decelerationRate={0}
          snapToInterval={this.WINDOW_WIDTH}
          data={[{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }]}
          onScroll={this.handleScroll}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to React Native! {item.key}
              </Text>
            </View>
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
      </View>
    );
  }

  handleScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }) => {
    // this.checkScroll.scrollToOffset({ offset: y, animated: true });
    try {
      this.headerList.scrollToOffset({
        offset: (x * this.HEADER_WIDTH) / this.WINDOW_WIDTH,
        animated: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  onViewableItemsChanged = info => {
    if (info.viewableItems.length === 1) {
      this.setState({ currentPage: info.viewableItems[0].key });
      console.log('scrolling to ', info.viewableItems[0].index);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
    // borderWidth: 2
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
