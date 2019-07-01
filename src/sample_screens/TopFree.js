import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';

const sampleStoreData = [
  {
    key: '1',
    title: 'Facebook',
    developer: 'Facebook. Inc.',
    icon: 'https://image.flaticon.com/icons/png/512/124/124010.png',
    cost: 0
  },
  {
    key: '2',
    title: 'Calculator',
    developer: 'Microsoft Corporation',
    icon:
      'https://store-images.s-microsoft.com/image/apps.64004.9007199266248474.006cef53-b490-44da-a602-3a85024fd160.01d7fe80-37e8-444d-a95b-d0080d246c92?mode=scale&q=90&h=200&w=200&background=%230078D7',
    cost: 0
  },
  {
    key: '3',
    title: 'PowerPoint',
    developer: 'Microsoft Corporation',
    icon:
      'https://images.techhive.com/images/article/2014/04/2-powerpoint-100259341-large.jpg',
    cost: 0
  },
  {
    key: '4',
    title: 'WhatsApp',
    developer: 'WhatsApp Inc.',
    icon:
      'https://store-images.microsoft.com/image/apps.22524.9007199266291855.17d17c7d-86d2-4bff-9d19-1804e3d61f4c.87b54d9e-688f-40a6-b864-2de23c06e3b6?mode=scale&q=90&h=300&w=300',
    cost: 0
  }
];

export default class TopFree extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={sampleStoreData}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                marginStart: 10,
                marginBottom: 10
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{ height: 100, width: 100 }}
              />
              <View style={{ marginStart: 10 }}>
                <Text
                  style={{ color: 'white', fontSize: 25, fontWeight: '300' }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: '300',
                    marginTop: 3
                  }}
                >
                  {item.developer}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: '300',
                    marginTop: 3
                  }}
                >
                  {item.cost ? `$${item.cost}` : 'free'}
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
    backgroundColor: 'black'
  }
});
