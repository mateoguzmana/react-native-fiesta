import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { FiestaThemes, Fireworks } from 'react-native-fiesta';
import LogoImage from '../assets/logo.png';

const FIREWORK_RADIUS = Dimensions.get('window').width * 1.5;
const THROW_FIREWORKS_INTERVAL = 1200;
const LOGO_ANIMATION_DURATION = 3000;
const newYearThemes = [
  FiestaThemes.Default,
  FiestaThemes.Neon,
  FiestaThemes.Wedding,
  ['#FFFFFF', '#F9F6F7', '#FFE8D6'],
];

const getRandomFiestaTheme = () => {
  const randomIndex = Math.floor(Math.random() * newYearThemes.length);

  return newYearThemes[randomIndex];
};

function App() {
  const [dynamicKey, setDynamicKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDynamicKey(dynamicKey + 1);
    }, THROW_FIREWORKS_INTERVAL);

    return () => clearInterval(interval);
  }, [dynamicKey]);

  return (
    <View style={styles.container}>
      <Logo />

      <Fireworks
        key={dynamicKey}
        fireworkRadius={FIREWORK_RADIUS}
        numberOfFireworks={10}
        autoHide
        theme={getRandomFiestaTheme()}
      />
    </View>
  );
}

const Logo = memo(() => {
  const color = useRef(new Animated.Value(0)).current;

  const changeImageColorAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(color, {
          toValue: 1,
          duration: LOGO_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(color, {
          toValue: 0,
          duration: LOGO_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]),
      { iterations: Infinity }
    ).start();
  }, [color]);

  useEffect(() => {
    changeImageColorAnimation();
  }, [changeImageColorAnimation]);

  return (
    <>
      <Animated.Image source={LogoImage} style={styles.image} />
      <Animated.Image
        source={LogoImage}
        style={[
          styles.overlayImage,
          {
            opacity: color.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1717',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    tintColor: '#E5BA73',
    opacity: 0.8,
  },
  overlayImage: {
    resizeMode: 'cover',
    tintColor: '#FFFBE9',
    zIndex: 1,
    position: 'absolute',
  },
});

export default App;
