<h1 align="center">React Native Fiesta 🎉</h1>

<p align="center">A set of celebration animations powered by Skia. Engage more with your users by celebrating in your React Native application.</p>

https://user-images.githubusercontent.com/20783123/183688980-c8da6037-956f-4c70-b9f2-d1b9acee4c5a.mov

Fiesta is a set of animations ideal for celebration and user engagement.

`react-native-fiesta` is fully powered by [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/).

## Library Under Construction 🚧

This library is still under construction. Below, a list of features that are currently being worked on.

- ✅ Birthday Balloons (Twitter style)
- ✅ Dark Balloons
- ✅ Fireworks
- ✅ Hearts
- ✅ Stars
- Smoother Animations (improve the feel of the animations)
- Light Balloons
- Flowers
- May 5th (or other special days)
- Pumpkins
- Lollipops
- Music Notes
- Party Poppers
- Button Celebrations

## Installation

1. As this library fully relies on `@shopify/react-native-skia`, please follow the installation in their [docs](https://shopify.github.io/react-native-skia/docs/getting-started/installation).

2. After installing the dependencies, you can simply install Fiesta with:

```bash
yarn add react-native-fiesta
```

Or

```bash
npm install react-native-fiesta
```

## Usage

```js
import { StyleSheet, View } from 'react-native';
import { Birthday } from 'react-native-fiesta';

function App() {
  return (
    <View style={styles.container}>
      <Birthday />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

You can see more examples in the [example](./example) project.

## Contributing

Please read the [guidelines](./CONTRIBUTING.md).

- If you have any questions or suggestions, please open an issue on [Github](https://github.com/mateoguzmana/react-native-fiesta/issues).
- To contribute adding a new animation or by improving the existing ones, please open a pull request.
- If you have a cool theme the community can use, don't hesitate opening an issue to suggest it (or just shoot a PR).

## License

MIT
