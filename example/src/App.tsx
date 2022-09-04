import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FiestaProvider } from 'react-native-fiesta';

import { Examples } from './components/Examples';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FiestaProvider>
        <Examples />
      </FiestaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
