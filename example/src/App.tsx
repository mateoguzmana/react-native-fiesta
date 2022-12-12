import React from 'react';
import { useFont } from '@shopify/react-native-skia';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FiestaProvider } from 'react-native-fiesta';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Examples } from './components/Examples';

function App() {
  const font = useFont(require('./fonts/OpenMoji-Color.ttf'), 30);

  if (!font) return null;

  return (
    <ActionSheetProvider>
      <FiestaProvider font={font}>
        <SafeAreaView style={styles.container}>
          <Examples />
        </SafeAreaView>
      </FiestaProvider>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D31',
  },
});

export default App;
