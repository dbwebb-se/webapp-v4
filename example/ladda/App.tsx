import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostList from './components/PostList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{padding: 12}}>
      <Text style={{fontSize: 48}}>Ladda</Text>
      <PostList />
      <StatusBar style="auto" />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
