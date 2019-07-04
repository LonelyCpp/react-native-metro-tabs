/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import MetroTabs from './src/MetroTabs';
import TopFree from './src/sample_screens/TopFree';

export default class App extends Component {
  render() {
    return (
      <MetroTabs
        screens={[
          { key: '1', title: 'top free', screen: <TopFree /> },
          { key: '2', title: 'trending', screen: <TopFree /> },
          { key: '3', title: 'top paid', screen: <TopFree /> }
        ]}
      />
    );
  }
}
