import { StyleSheet, Dimensions, Platform } from "react-native";
let deviceWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Paddingwidth = Dimensions.get("window").width - 55;
const styles = StyleSheet.create({
  bank_scroll: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    height: 140
  },
  footerCus: {
    backgroundColor: "transparent",
    height: 80,
    padding: 10
  },
  input_Item_Cus: {
    borderColor: "#D3D3D3",
    borderWidth: 1
  },
  input_Item: {
    marginBottom: 10,
    borderColor: "#FFFFFF"
  },
  input_header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7B1FA2"
  },
  cus_placeColorA: {
    color: "#a9a9a9"
  },
  cus_placeColorB: {
    color: "#4527A0"
  },
  colorA: {
    fontWeight: "bold",
    color: "#a9a9a9"
  },
  colorB: {
    fontWeight: "bold",
    color: "#4527A0"
  },
  input_Item_Cus_txtArea: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    // width: "100%"
    flex: 1
  }
});

export default styles;
