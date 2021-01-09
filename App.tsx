import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeContainer from './src/container/HomeContainer';
import TimeTableNavigator from './src/navigator/TimeTableNavigator';
import { createStore } from 'redux';
import rootReducer from './src/reducer';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeContainer} />
          <Drawer.Screen name="Time Table" component={TimeTableNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
