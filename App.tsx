import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeContainer from './src/container/HomeContainer';
import TimeTableNavigator from './src/navigator/TimeTableNavigator';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeContainer} />
        <Drawer.Screen name="Time Table" component={TimeTableNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
