import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  sectionListContainer: {
    marginStart: 15,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  charRowContainer: {
    flexDirection: "row",
  },
  contactItemContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  contactImage: {
    height: 50,
    width: 50,
  },
  contactName: {
    color: "white",
    fontSize: 22,
    fontWeight: "200",
    marginStart: 16,
  },
  sectionTileContainer: {
    backgroundColor: "#000",
  },
  sectionTile: {
    backgroundColor: "#2d89ef",
    height: 50,
    width: 50,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  charTile: {
    backgroundColor: "#2d89ef",
    height: 50,
    width: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  charTileDisabled: {
    backgroundColor: "grey",
  },
  charText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
