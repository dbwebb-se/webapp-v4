import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();


import PostList from "./components/PostList";
import Book from "./components/Book";

export default function App() {
  const [currentGPSLocation, setCurrentGPSLocation] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Laddstolpar">
            {() => <PostList currentGPSLocation={currentGPSLocation} setCurrentGPSLocation={setCurrentGPSLocation} />}
          </Tab.Screen>
          <Tab.Screen name="Boka">
            {() => <Book currentGPSLocation={currentGPSLocation}s />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
