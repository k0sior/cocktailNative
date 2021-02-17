import React from "react";
import { StyleSheet, Button, SafeAreaView, Text, View } from "react-native";
import links from "../links";

const Header = () => {
  return (
    <View style={styles.header}>
      {links.map((link) => {
        const { id, name, url } = link;
        return (
          <Text
            style={styles.linkStyle}
            onPress={() => console.log(url)}
            key={id}
          >
            {name}
          </Text>
        );
      })}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    marginBottom: 30,
    width: "100vw",
    backgroundColor: "hsl(205, 89%, 70%)",
    height: 40,
  },

  linkStyle: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 18,
    zIndex: 2,
  },
});
