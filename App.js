import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import Header from "./components/Header";

const drinksUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Wszystkie");

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${drinksUrl}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
            strCategory,
            strInstructions,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
            category: strCategory,
            instructions: strInstructions,
          };
        });
        setDrinks(newDrinks);
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchDrinks();
    }, 1000);
  }, []);

  const allCategories = [
    "Wszystkie",
    ...new Set(drinks.map((item) => item.category)),
  ];

  const setCategory = (e) => {
    setCurrentCategory(e);
    console.log(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: "45vh" }} />
      ) : (
        <View style={styles.container}>
          <View style={styles.categoriesContainer}>
            {allCategories.map((cat, i) => {
              return (
                <Text
                  key={i}
                  style={
                    currentCategory === cat
                      ? [
                          styles.categoriesLinks,
                          { textDecoration: "underline" },
                        ]
                      : styles.categoriesLinks
                  }
                  onPress={() => setCategory(cat)}
                >
                  {cat}
                </Text>
              );
            })}
          </View>
          {drinks.map((drink, i) => {
            const { id, name, category, image, glass } = drink;
            if (currentCategory === category) {
              return (
                <View
                  key={id}
                  style={
                    i % 2 === 0
                      ? styles.singleDrink
                      : [
                          styles.singleDrink,
                          { backgroundColor: "hsl(205, 81%, 81%)" },
                        ]
                  }
                  onPress={() =>
                    console.log("wybrano sobie drinka ale nie działa :<")
                  }
                >
                  <View>
                    <Image style={styles.img} source={image} />
                  </View>
                  <View style={styles.drinkInfo}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {name}
                    </Text>
                    <Text>{category}</Text>
                    <Text>{glass}</Text>
                  </View>
                </View>
              );
            }
            if (currentCategory === "Wszystkie") {
              return (
                <View
                  key={id}
                  style={
                    i % 2 === 0
                      ? styles.singleDrink
                      : [
                          styles.singleDrink,
                          { backgroundColor: "hsl(205, 81%, 81%)" },
                        ]
                  }
                  onPress={() =>
                    console.log("wybrano sobie drinka ale nie działa :<")
                  }
                >
                  <View>
                    <Image style={styles.img} source={image} />
                  </View>
                  <View style={styles.drinkInfo}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {name}
                    </Text>
                    <Text>{category}</Text>
                    <Text>{glass}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(205, 90%, 88%)",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: "100%",
    marginRight: 40,
  },
  singleDrink: {
    padding: 10,
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  drinkInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    padding: 20,
    marginTop: "-30px",
    width: "100vw",
    backgroundColor: "hsl(205, 81%, 81%)",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoriesLinks: {
    fontSize: 20,
    marginRight: 7,
    marginLeft: 7,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
