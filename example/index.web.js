import { registerRootComponent } from 'expo';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

LoadSkiaWeb().then(async () => {
  const App = (await import('./src/App')).default;
  registerRootComponent(App);
});
