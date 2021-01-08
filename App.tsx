import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import route from './src/constant/route';
import HomeContainer from './src/container/HomeContainer';
import TimeTableContainer from './src/container/TimeTableContainer/TimeTableContainer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={route.home}>
        <Drawer.Screen name={route.home} component={HomeContainer} />
        <Drawer.Screen name={route.timetable} component={TimeTableContainer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
