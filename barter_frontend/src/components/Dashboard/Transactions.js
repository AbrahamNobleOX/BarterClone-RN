import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { menus, styles } from './Dashboard';
import Tab from './Tab';

const { width, height } = Dimensions.get('window');

const transactions = [
  { type: 'send', name: 'Samuel', price: 200, purpose: 'I paid money to Victor' },
  {
    type: 'received',
    name: 'Cynthia',
    price: 200,
    purpose: 'Refund from mama Deborah',
    date: 'Mar 3 2021',
  },
  {
    type: 'send',
    name: 'Samuel',
    price: 200,
    purpose: 'I bought an apple',
    date: 'Mar 3 2021',
  },
  {
    type: 'received',
    name: 'Nengi',
    price: 200,
    purpose: 'Office Payment',
    date: 'Mar 3 2021',
  },
  {
    type: 'send',
    name: 'Samuel',
    price: 200,
    purpose: 'I bought a shoe',
    date: 'Mar 3 2021',
  },
  {
    type: 'received',
    name: 'Nnanna',
    price: 200,
    purpose: 'Transfer from Emeka',
    date: 'Mar 3 2021',
  },
];

function Transactions({ navigation }) {
  Icon.loadFont();
  const { navigate } = navigation;

  const onSwitch = (routeNumber, routeName) => {
    const isCurrentRoute = routeNumber === 2 ? true : false;
    if (!isCurrentRoute) {
      navigate(routeName);
    }
  };

  return (
    <Box flex={1} backgroundColor="white" justifyContent="flex-end">
      <Box height={height * 0.25} backgroundColor="white" paddingHorizontal="m">
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          paddingTop="s">
          {/* <Ionicons name="settings" size={28} color={theme.colors.darkGrey} /> */}
          <Icon name="gear" size={25} color={theme.colors.darkGrey} />
          <Text
            variant="title1"
            color="darkGrey"
            fontSize={28}
            marginHorizontal="m">
            |
          </Text>
          {/* <Ionicons
            name="notifications"
            size={28}
            color={theme.colors.darkGrey}
          /> */}
          <Icon name="bell" size={25} color={theme.colors.darkGrey} />
        </Box>
        <Box
          backgroundColor="barter2"
          paddingHorizontal="m"
          paddingVertical="m"
          marginTop="s"
          borderRadius="m">
          <Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="title1" color="black" fontSize={30}>
                ₦560.
                <Text variant="title1" fontSize={12} marginRight="m">
                  00
                </Text>
              </Text>
              <Box
                backgroundColor="darkGrey"
                style={{ paddingHorizontal: 10, paddingVertical: 4 }}
                borderRadius="s"
                justifyContent="center"
                alignItems="center">
                <Text
                  textAlign="center"
                  variant="title1"
                  fontSize={15}
                  color="black"
                  style={{ color: '#000' }}>
                  NGN
                  <Box justifyContent="center" alignItems="center">
                    <MaterialIcon
                      name="arrow-drop-down"
                      size={18}
                      color={theme.colors.black}
                    />
                  </Box>
                </Text>
              </Box>
            </Box>
          </Box>
          <Box marginTop="m" marginBottom="m">
            <Box
              width={90}
              backgroundColor="darkGrey"
              style={{ paddingHorizontal: 5, paddingVertical: 7 }}
              borderRadius="s"
              alignItems="center"
              justifyContent="center"
              marginTop="s">
              <Text variant="title1" fontSize={15} color="black">
                Add money
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <NativeBaseProvider>
        <ScrollView
          style={{ paddingBottom: theme.spacing.xl }}
          showsVerticalScrollIndicator={false}>
          <Box paddingHorizontal="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="title1" color="black" fontSize={15} >Last 7 days</Text>
            </Box>
          </Box>
          <Box
            flexDirection="row"
            paddingHorizontal="s"
            justifyContent="flex-end">
            {/* <Box>
              <Text variant="title1" color="black" fontSize={15} >Graph</Text>
            </Box> */}
            <Box paddingRight="xl">
              <Box marginBottom="m">
                <Text variant="body" fontSize={12}>
                  Total Spending
                </Text>
                <Text color="danger" variant="title1" fontSize={25}>
                  ₦0.00
                </Text>
              </Box>

              <Box>
                <Text variant="body" fontSize={12}>
                  Total money received
                </Text>
                <Text color="primary" variant="title1" fontSize={25}>
                  ₦0.00
                </Text>
              </Box>
            </Box>
          </Box>
          <Box paddingVertical="m">
            {!transactions.length > 0 ? (
              <Text variant="title1" textAlign="center">No transactions for last 7 days</Text>
            ) : (
              <Box>
                {transactions.map(
                  ({ name, type, price, purpose, date }, index) => (
                    <Box
                      key={index}
                      paddingHorizontal="m"
                      flexDirection="row"
                      justifyContent="space-between"
                      marginBottom="m"
                      alignItems="center"
                      paddingVertical="m"
                      borderBottomWidth={1}>
                      <Box>
                        <Text variant="body">{name}</Text>
                        <Text variant="body" fontsize={5} marginTop="s">
                          {date}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          variant="body"
                          fontWeight="600"
                          color={type == 'received' ? 'primary' : 'danger'}>
                          {type == 'send' ? `- ₦${price}` : `₦${price}`}
                        </Text>
                      </Box>
                    </Box>
                  ),
                )}
              </Box>
            )}
          </Box>
        </ScrollView>
      </NativeBaseProvider>

      {/* Tab Navigation */}
      <Box height={80} backgroundColor="danger">
        <Box style={{ ...styles.tabs }}>
          {menus.map(({ icon, text, routeName }, index) => (
            <Box {...{ index }} style={{ ...styles.tab }} key={index}>
              <Tab
                onPress={(index, route) => onSwitch(index, route)}
                {...{ index, text, routeName }}>
                {icon}
              </Tab>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Transactions;
