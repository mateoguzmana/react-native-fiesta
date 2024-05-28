import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Firework } from 'react-native-fiesta';
import { Canvas } from '@shopify/react-native-skia';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const COLUMN_SIZE = Dimensions.get('window').width * 0.33;
const initialPosition = {
  x: COLUMN_SIZE / 2,
  y: COLUMN_SIZE / 2,
};

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToExample = (example: string) =>
    navigation.navigate('FiestaExample', { example });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.column}
          onPress={() => navigateToExample('Firework')}
        >
          <Canvas style={styles.column}>
            <Firework
              color="rgba(164, 164, 164, 0.4)"
              initialPosition={initialPosition}
              fireworkRadius={Dimensions.get('screen').width * 0.33}
              numberOfParticles={40}
              autoHide={true}
            />
          </Canvas>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.column}
          onPress={() => navigateToExample('Fireworks')}
        >
          <Canvas style={styles.column}>
            <Firework
              color="rgba(164, 164, 164, 0.4)"
              initialPosition={initialPosition}
              fireworkRadius={Dimensions.get('screen').width * 0.33}
              numberOfParticles={40}
              autoHide={false}
            />
          </Canvas>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.column}
          onPress={() => navigateToExample('CrazyFireworks')}
        >
          <Canvas style={styles.column}>
            <Firework
              color="rgba(164, 164, 164, 0.4)"
              initialPosition={initialPosition}
              fireworkRadius={Dimensions.get('screen').width * 0.33}
              numberOfParticles={40}
              autoHide={false}
            />
          </Canvas>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181D31',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 130,
  },
  column: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: COLUMN_SIZE,
    height: COLUMN_SIZE,
  },
  digitalClock: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
