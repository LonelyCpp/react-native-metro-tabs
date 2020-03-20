import React, { Component, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity
} from "react-native";

const sampleContactsData = [
  { title: "A", data: ["Ara Mcquille", "Arcelia Sange"] },
  { title: "B", data: ["Belia Mouzo", "Burl Benefiel"] },
  { title: "C", data: ["Catarina Macarae", "Chong Fasan"] },
  { title: "D", data: ["Darren Calli", "Deandra Cothro"] },
  { title: "E", data: ["Edwardo Holt", "Emely Grunwal"] },
  {
    title: "J",
    data: [
      "Jamison Wei",
      "Jannette Garrawa",
      "Jeanice Mab",
      "Jefferson Green",
      "Jimmie Lombard"
    ]
  },
  { title: "K", data: ["Katharyn Drysdal", "Kris Laske"] },
  {
    title: "L",
    data: [
      "Latanya Depau",
      "Lavera Nettle",
      "Letty Ut",
      "Lisabeth Croyl",
      "Lorena Mchug",
      "Lorinda Ic"
    ]
  },
  {
    title: "M",
    data: [
      "Madalyn Kinze",
      "Mahalia Echevarri",
      "Maia Aher",
      "Mardell Verrie",
      "Marquitta Wirt",
      "Maye Cuet",
      "Mazie Palmor",
      "Merna Fande",
      "Milo Dewal",
      "Mina Banniste"
    ]
  },
  { title: "N", data: ["Noella Sidene", "Nona Mckinn"] },
  { title: "P", data: ["Pamella Ovall"] },
  {
    title: "R",
    data: [
      "Robbin Elmendor",
      "Rossana Reynol",
      "Roxy Crai",
      "Rufina Abdalla",
      "Ruth Cleg"
    ]
  },
  { title: "S", data: ["Santiago Sell"] },
  { title: "T", data: ["Telma Caesa", "Tennie Hibbar", "Tora Abundi"] },
  { title: "V", data: ["Versie Schindle"] },
  { title: "W", data: ["Wanda Steige"] },
  { title: "Y", data: ["Yetta Hedle", "Yolande Gras"] },
  { title: "Z", data: ["Zada Ray"] }
];

export default class Contacts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={{
            marginStart: 15,
            marginBottom: 10
          }}
          keyExtractor={(item, index) => item + index}
          sections={sampleContactsData}
          renderItem={item => <ContactItem {...item} />}
          renderSectionHeader={sec => <SectionHeader {...sec} />}
        />
      </View>
    );
  }
}

const ContactItem = ({ item }) => {
  const randomImgUrl = useRef(
    `https://i.picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200.jpg`
  );
  console.log(randomImgUrl.current);
  return (
    <View
      style={{ marginVertical: 8, flexDirection: "row", alignItems: "center" }}
    >
      <Image
        source={{
          uri: randomImgUrl.current
        }}
        style={{ height: 50, width: 50 }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "200",
          marginStart: 16
        }}
      >
        {item}
      </Text>
    </View>
  );
};

const SectionHeader = ({ section: { title } }) => {
  return (
    <View style={{ backgroundColor: "black" }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: "#2d89ef",
          height: 50,
          width: 50,
          marginVertical: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
