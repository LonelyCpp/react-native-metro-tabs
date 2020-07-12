import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Animated,
  SectionList,
  TouchableOpacity,
} from "react-native";
import sampleContactsData from "./contacts.json";
import styles from "./styles";

const alphabets = [];
const alphabetsGroups = [];
const alphabetsGroupSize = 6;

// generate capital alphabets from their ascii code
for (let i = 65; i < 91; i++) {
  alphabets.push(String.fromCharCode(i));
}

// group alphabets into a given group size
// eg size 3 -> [[a, b, c], [d, e, f], ...]
while (alphabets.length > 0) {
  alphabetsGroups.push(alphabets.splice(0, alphabetsGroupSize));
}

// list of only available characters
// characters that have no contacts associated with it is greyed out
// also used to find the position of a section in the list
const availableChars = sampleContactsData.map((item) => item.title);

const Contacts = () => {
  const listRef = useRef(null);
  const [showCharPicker, setShowCharPicker] = useState(false);

  const scrollToChar = useCallback(
    (char) => {
      listRef.current.scrollToLocation({
        sectionIndex: availableChars.findIndex((item) => item === char[0]),
        itemIndex: 0,
      });
      setShowCharPicker(false);
    },
    [listRef]
  );

  return (
    <View style={styles.container}>
      <SectionList
        ref={listRef}
        sections={sampleContactsData}
        keyExtractor={(item, index) => item + index}
        renderItem={(item) => <ContactItem {...item} />}
        contentContainerStyle={styles.sectionListContainer}
        renderSectionHeader={(sec) => (
          <SectionHeader {...sec} onPress={() => setShowCharPicker(true)} />
        )}
      />
      <Modal transparent visible={showCharPicker}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={() => setShowCharPicker(false)}
        >
          {alphabetsGroups.map((item) => {
            return (
              <View style={styles.charRowContainer}>
                {item.map((item) => {
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

const ContactItem = ({ item, index }) => {
  const randomImgUrl = useRef(`https://picsum.photos/id/${index}/200/200`);

  return (
    <View style={styles.contactItemContainer}>
      <Image
        style={styles.contactImage}
        source={{ uri: randomImgUrl.current }}
      />
      <Text style={styles.contactName}>{item}</Text>
    </View>
  );
};

const SectionHeader = ({ section: { title }, onPress }) => {
  return (
    <View style={styles.sectionTileContainer}>
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
  // start with 90 degrees
  const introAnim = useRef(new Animated.Value(Math.PI / 2));

  // trigger animation after mount
  useEffect(() => {
    Animated.timing(introAnim.current, {
      toValue: 0,
      duration: 300,
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
          !enabled && styles.charTileDisabled,
          { transform: [{ rotateX: introAnim.current }] },
        ]}
      >
        <Text style={styles.charText}>{char}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Contacts;
