/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import MetroTabs from "./src/MetroTabs";
import StoreListing from "./src/sample_screens/StoreListing";
import Contacts from "./src/sample_screens/Contacts";

export default class App extends Component {
  render() {
    return (
      <MetroTabs
        screens={[
          { key: "1", title: "top free", screen: <StoreListing /> },
          { key: "2", title: "Contacts", screen: <Contacts /> },
          { key: "3", title: "top paid", screen: <StoreListing /> }
        ]}
      />
    );
  }
}
