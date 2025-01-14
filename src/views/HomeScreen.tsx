import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button, TouchableOpacity, FlatList, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { backgroundColor } from "../styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Card from "../components/card";
import { dadosMarcas, dadoArray } from "../../fetchData";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [carData, setCarData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dadoArray();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const dataM = await dadosMarcas();
        setBrandData(dataM);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMarcas();
  }, []);

  return (
    <View style={{alignItems:"center"}}>
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}

        data={brandData}
        keyExtractor={(item) => item.Brand.toString()}
        renderItem={({ item }) => <Image source={{ uri: item?.Image }} style={{height: 50, width: 50, margin: 4, borderRadius: 30}} />}
      />
      <FlatList
        data={carData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card car={item} />}
      />
    </View>
  );
};

export default HomeScreen;


