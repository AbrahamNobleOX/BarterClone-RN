import * as React from 'react';
import Dashboard from './Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Box } from '../theme';

/* Componets */
import Card from './Card';
import Transactions from './Transactions';
import More from './More';
import Send from './Send';
import SendMoney from './SendMoney';
import Notifications from './Notifications';

const DashBoardStack = createStackNavigator();

export const DashboardNavigator = () => (
  <DashBoardStack.Navigator initialRouteName="Home">
    <DashBoardStack.Screen
      name="Home"
      options={{ headerShown: false }}
      component={Dashboard}
    />
    <DashBoardStack.Screen name="Card" component={Card} />
    <DashBoardStack.Screen name="Transactions" component={Transactions} />
    <DashBoardStack.Screen name="More" component={More} />
    <DashBoardStack.Screen
      name="Send"
      component={Send}
      options={{
        headerTitle: () => (
          <Text variant="title1" color="black" fontSize={20}>
            Bank Transfer
          </Text>
        ),
      }}
    />

    <DashBoardStack.Screen
      name="SendMoney"
      component={SendMoney}
      options={{
        headerTitle: () => (
          <Text variant="title1" color="black" fontSize={20}>
            Send Money
          </Text>
        ),
      }}
    />

    <DashBoardStack.Screen
      name="Notifications"
      component={Notifications}
      options={{
        headerTitle: () => (
          <Text variant="title1" color="black" fontSize={20}>
            Notifications
          </Text>
        ),
      }}
    />
  </DashBoardStack.Navigator>
);
