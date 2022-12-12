import React from 'react';
import { useFont } from '@shopify/react-native-skia';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FiestaProvider } from 'react-native-fiesta';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Examples } from './components/Examples';

function App() {
  const font = useFont(require('./fonts/OpenMoji-Color.ttf'), 30);

  if (!font) return null;

  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <FiestaProvider font={font}>
          <Examples />
        </FiestaProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}

export default App;
