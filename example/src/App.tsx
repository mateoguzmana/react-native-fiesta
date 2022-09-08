import { useFont } from '@shopify/react-native-skia';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FiestaProvider } from 'react-native-fiesta';

import { Examples } from './components/Examples';

function App() {
  const font = useFont(require('./fonts/OpenMoji-Color.ttf'), 30);

  if (!font) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FiestaProvider font={font}>
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
