import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import sampleStoreData from "./store_listing.json";

export default class StoreListing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={sampleStoreData}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.icon }} style={itemStyles.image} />
              <View style={itemStyles.infoContainer}>
                <Text style={itemStyles.title}>{item.title}</Text>
                <Text style={itemStyles.developer}>{item.developer}</Text>
                <Text style={itemStyles.cost}>
                  {item.cost ? `$${item.cost}` : "free"}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  list: {
    paddingBottom: 30,
  },
  itemContainer: {
    flexDirection: "row",
    marginStart: 10,
    marginBottom: 10,
  },
});

const itemStyles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
  infoContainer: {
    marginStart: 10,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "300",
  },
  developer: {
    color: "white",
    fontSize: 13,
    fontWeight: "300",
    marginTop: 3,
  },
  cost: {
    color: "white",
    fontSize: 13,
    fontWeight: "300",
    marginTop: 3,
  },
});
