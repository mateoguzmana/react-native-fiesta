import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Firework, Fireworks } from 'react-native-fiesta';
import { Canvas } from '@shopify/react-native-skia';
import { type RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../App';

type FiestaExampleScreenNavigationProp = RouteProp<
  RootStackParamList,
  'FiestaExample'
>;

const initialPosition = {
  x: Dimensions.get('window').width / 2,
  y: Dimensions.get('window').width / 2,
};

export function FiestaExample() {
  const route = useRoute<FiestaExampleScreenNavigationProp>();

  const renderAnimation = useCallback(() => {
    switch (route.params.example) {
      case 'Firework':
        return (
          <Canvas style={styles.canvas}>
            <Firework
              color="rgba(179, 173, 196, 0.4)"
              initialPosition={initialPosition}
              fireworkRadius={Dimensions.get('window').width}
              autoHide={false}
            />
          </Canvas>
        );
      case 'Fireworks':
        return (
          <Fireworks
            fireworkRadius={Dimensions.get('window').width}
            autoHide={false}
          />
        );
      case 'CrazyFireworks':
        return (
          <Fireworks
            autoHide={false}
            numberOfFireworks={3}
            numberOfParticles={80}
            fireworkRadius={2000}
          />
        );
      default:
        return null;
    }
  }, [route.params.example]);

  return <View style={styles.container}>{renderAnimation()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D31',
  },
  canvas: {
    flex: 1,
  },
});
