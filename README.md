<h1 align="center">React Native Fiesta</h1>

<p align="center">Engage more with your users by celebrating in your React Native application.</p>

https://user-images.githubusercontent.com/20783123/183688980-c8da6037-956f-4c70-b9f2-d1b9acee4c5a.mov

Fiesta is a set of animations ideal for celebration and user engagement.

`react-native-fiesta` is fully powered by `@shopify/react-native-skia`.

## Library Under Construction

This library is still under construction. Below, a list of features that are currently being worked on.

- [✅] Birthday Balloons (Twitter style)
- [✅] Dark Balloons
- [ ] Light Balloons
- [ ] Fireworks
- [ ] Hearts
- [ ] Lollipops
- [ ] Music Notes
- [ ] Party Poppers
- [ ] Stars

## Installation

1. As this library fully relies on `@shopify/react-native-skia`, please follow the installation in their [docs](https://shopify.github.io/react-native-skia/docs/getting-started/installation).

2. After installing the dependencies, you can simply install Fiesta with:

```bash
yarn add react-native-fiesta
```

## Usage

```js
import { StyleSheet, View } from "react-native";
import { Birthday } from "react-native-fiesta";

const App = () => {
  return (
    <View style={styles.container}>
      <Birthday />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```
