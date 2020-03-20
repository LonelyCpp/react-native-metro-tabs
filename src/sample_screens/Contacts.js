import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Modal,
  Animated
} from "react-native";
import sampleContactsData from "./contacts.json";

const alphabets = [];
const alphabetsGroups = [];
const alphabetsGroupSize = 6;

for (let i = 65; i < 91; i++) {
  alphabets.push(String.fromCharCode(i));
}
while (alphabets.length > 0) {
  alphabetsGroups.push(alphabets.splice(0, alphabetsGroupSize));
}

const availableChars = sampleContactsData.map(item => item.title);

const Contacts = () => {
  const listRef = useRef(null);
  const [showCharPicker, setShowCharPicker] = useState(false);

  const scrollToChar = useCallback(
    char => {
      listRef.current.scrollToLocation({
        sectionIndex: availableChars.findIndex(item => item === char[0]),
        itemIndex: 0
      });
      setShowCharPicker(false);
    },
    [listRef]
  );

  return (
    <View style={styles.container}>
      <SectionList
        ref={listRef}
        contentContainerStyle={styles.sectionListContainer}
        keyExtractor={(item, index) => item + index}
        sections={sampleContactsData}
        renderItem={item => <ContactItem {...item} />}
        renderSectionHeader={sec => (
          <SectionHeader {...sec} onPress={() => setShowCharPicker(true)} />
        )}
      />
      <Modal transparent visible={showCharPicker}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowCharPicker(false)}
          style={styles.modalContainer}
        >
          {alphabetsGroups.map(item => {
            return (
              <View style={styles.charRowContainer}>
                {item.map(item => {
                  return (
                    <CharTile
                      char={item}
                      onPress={scrollToChar}
                      enabled={availableChars.includes(item)}
                    />
                  );
                })}
              </View>
            );
          })}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const ContactItem = ({ item }) => {
  const randomImgUrl = useRef(
    `https://i.picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200.jpg`
  );

  return (
    <View style={styles.contactItemContainer}>
      <Image
        source={{ uri: randomImgUrl.current }}
        style={styles.contactImage}
      />
      <Text style={styles.contactName}>{item}</Text>
    </View>
  );
};

const SectionHeader = ({ section: { title }, onPress }) => {
  return (
    <View style={{ backgroundColor: "black" }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.sectionTile}
      >
        <Text style={styles.sectionTileText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const CharTile = ({ char, onPress, enabled }) => {
  const introAnim = useRef(new Animated.Value(1));
  useEffect(() => {
    Animated.timing(introAnim.current, {
      toValue: 0,
      duration: 300
    }).start();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={enabled ? 0.8 : 1}
      onPress={() => (enabled ? onPress(char) : null)}
    >
      <Animated.View
        style={[
          styles.charTile,
          !enabled && { backgroundColor: "grey" },
          {
            transform: [
              {
                rotateX: introAnim.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "90deg"]
                })
              }
            ]
          }
        ]}
      >
        <Text style={styles.charText}>{char}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  sectionListContainer: {
    marginStart: 15,
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa"
  },
  charRowContainer: {
    flexDirection: "row"
  },
  contactItemContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  contactImage: {
    height: 50,
    width: 50
  },
  contactName: {
    color: "white",
    fontSize: 22,
    fontWeight: "200",
    marginStart: 16
  },
  sectionTile: {
    backgroundColor: "#2d89ef",
    height: 50,
    width: 50,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionTileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  charTile: {
    backgroundColor: "#2d89ef",
    height: 50,
    width: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  charText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default Contacts;
