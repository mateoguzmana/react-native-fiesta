import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { FiestaExample } from './screens/FiestaExample';

export type RootStackParamList = {
  Home: undefined;
  FiestaExample: { example: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* @ts-ignore: problems with expo and react version types */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FiestaExample"
          component={FiestaExample}
          options={(props) => {
            const { route } = props;

            return {
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#181D31',
              },
              headerTitle: route.params.example,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <Text>Hello</Text>
    // </View>
  );
}
