import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TimeTableContainer from '../container/TimeTableContainer';
import ModuleSearchContainer from '../container/ModuleSearchContainer';
import ModuleSelectContainer from '../container/ModuleSelectContainer';

const Stack = createStackNavigator();

const TimeTableNavigator = () => (
  <Stack.Navigator initialRouteName="Timetable">
    <Stack.Screen
      name="Timetable"
      component={TimeTableContainer}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ModuleSearch" component={ModuleSearchContainer} />
    <Stack.Screen name="ModuleSelect" component={ModuleSelectContainer} />
  </Stack.Navigator>
);

export default TimeTableNavigator;
