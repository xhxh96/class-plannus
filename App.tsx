import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import route from "./src/constant/route";
import HomeContainer from "./src/container/HomeContainer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={route.home}>
        <Drawer.Screen name={route.home} component={HomeContainer} />
        <Drawer.Screen name={route.config} component={HomeContainer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
