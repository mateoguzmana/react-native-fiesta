import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Firework } from 'react-native-fiesta';
import { Canvas } from '@shopify/react-native-skia';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../App';

type FiestaExampleScreenNavigationProp = RouteProp<
  RootStackParamList,
  'FiestaExample'
>;

export function FiestaExample() {
  const route = useRoute<FiestaExampleScreenNavigationProp>();

  console.log({ route });

  return (
    <View style={styles.container}>
      <Canvas>
        <Firework />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
