import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthenticationNavigator } from './src/components/Auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardNavigator } from './src/components/Dashboard';

const AppStack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStack.Navigator
            // options={{ headerShown: false }}
            headerMode="none"
            initialRouteName="Authentication">
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="Dashboard" component={DashboardNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
