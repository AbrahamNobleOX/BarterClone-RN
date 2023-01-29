import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, ScrollView } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Butterfly,
  Phone,
  Bills,
  Nigeria,
  Usa,
  Home,
  Transactions,
  More,
  Cards,
} from '../../Icons';
import Animated from 'react-native-reanimated';
import { pattern } from '../../../assets/images';
import { SEGMENT, ICON_SIZE, PADDING } from '../../Constants';
import Tab from './Tab';
import {
  TapGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { socket, roomID, receiver } from '../../store/actions/transactionAction';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// Flat buttons array
const actions = [
  {
    title: 'Request Money',
    icon: <Butterfly width={20} height={20} />,
    color: '#FDD1FF',
    cta: 'Request',
  },
  {
    title: 'Send Money',
    icon: <Butterfly width={20} height={20} />,
    color: '#F9F9D6',
    cta: 'Send',
  },
  {
    title: 'Buy Airtime',
    icon: <Phone width={20} height={20} />,
    color: '#DCF5FF',
    cta: 'Buy',
  },
  {
    title: 'Pay Bills',
    icon: <Bills width={20} height={20} />,
    color: '#C6E1DD',
    cta: 'Pay',
  },
];

// Footer Tab Menu. Route 0, 1, 2 and 3. Dashboard.js which is "Home" is route zero
export const menus = [
  { text: 'Home', icon: <Home width={30} height={30} />, routeName: 'Home' },
  { text: 'Cards', icon: <Cards width={30} height={30} />, routeName: 'Card' },
  {
    text: 'Transactions', icon: <Transactions width={30} height={30} />, routeName: 'Transactions',
  },
  { text: 'More', icon: <More width={30} height={30} />, routeName: 'More' },
];

function Dashboard({ navigation }) {
  // Necessary for Icons to load, gotten from stackoverflow
  Icon.loadFont();
  MaterialIcon.loadFont();
  Entypo.loadFont();

  // For Navigation
  const { navigate } = navigation;
  // Call useDispatch from react redux
  const dispatch = useDispatch();

  // Get Account Balance from index.js in the reducer folder ".auth"
  const { account_balance } = useSelector((state) => state.auth);

  // On switch tab menu route and check if user is on the current route
  const onSwitch = (routeNumber, routeName) => {
    // check if user is on the current route. check if its zero return true or false, Dashboard.js is route zero
    const isCurrentRoute = routeNumber === 0 ? true : false;
    // if user is not on route zero, navigate to respective route, using the route name
    if (!isCurrentRoute) {
      navigate(routeName); // routeName is defined in the tab menu array above
    }
  };

  // On call to action. using "cta" defined in the actions array above
  const onCTA = (route) => {
    if (route === 'Send') navigate('Send');
    return;
  };

  useEffect(() => {
    socket.emit('joinService', { roomID });
    dispatch(receiver());
  }, []);

  return (
    <Box flex={1} backgroundColor="white" justifyContent="flex-end" marginTop="xl">
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
          <TouchableOpacity onPress={() => navigate('Notifications')}>
            {/* <Ionicons name="notifications" size={28} color={theme.colors.darkGrey} /> */}
            <Icon name="bell" size={25} color={theme.colors.darkGrey} />
          </TouchableOpacity>
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
                ₦{account_balance}.
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
      {/* NativeBaseProvider tag helps components take full screen */}
      <NativeBaseProvider>
        <ScrollView>
          <Box style={{ paddingBottom: theme.spacing.xl }}
            showsVerticalScrollIndicator={false} paddingHorizontal="s">
            <Box flexDirection="row" flexWrap="wrap" >
              {actions.map(({ title, icon, color, cta }) => (
                <Box
                  style={{ backgroundColor: color }}
                  padding="m"
                  key={title}
                  margin="s"
                  width={width / 2.3}
                  height={120}
                  borderRadius="m">
                  <TouchableOpacity onPress={() => onCTA(cta)}>
                    <Box
                      style={{ borderRadius: 100 }}
                      paddingVertical="m"
                      paddingHorizontal="s"
                      backgroundColor="white"
                      width={50}
                      justifyContent="center"
                      alignItems="center"
                      marginVertical="s">
                      {icon}
                    </Box>
                    <Text variant="title2" fontSize={13} fontWeight="700">
                      {title}
                    </Text>
                  </TouchableOpacity>
                </Box>
              ))}
            </Box>
            <TouchableOpacity>
              <Box paddingHorizontal="m" marginBottom="l">
                <Box
                  marginTop="l"
                  backgroundColor="barter3"
                  paddingVertical="l"
                  borderRadius="m"
                  height={150}
                  justifyContent="center"
                  alignItems="center"
                  paddingHorizontal="l">
                  <Entypo
                    name="circle-with-plus"
                    size={35}
                    color={theme.colors.barter}
                  />
                  <Text
                    variant="body"
                    textAlign="center"
                    paddingHorizontal="l"
                    marginTop="s">
                    Tap here to create your dollar card now
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>

            <Box paddingHorizontal="m" marginBottom="m">
              <ImageBackground
                source={pattern}
                style={{ height: 180, width: '100%' }}>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  paddingLeft="l"
                  paddingRight="xl"
                  paddingTop="xl"
                  borderRadius="l">
                  <Text variant="title2" color="white" fontWeight="700">
                    Send a redeemable gift card to family & friends anywhere in
                    the world
                  </Text>
                </Box>
              </ImageBackground>
            </Box>
          </Box>
        </ScrollView>
      </NativeBaseProvider>

      {/* Tab Menu, linked to Tab.js */}
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

      {/* Switch Currency */}
      <Animated.View
        style={{
          height: 150,
          width,
          position: 'absolute',
          bottom: -200,
          left: 0,
          backgroundColor: 'white',
        }}>
        <Box marginHorizontal="l" paddingTop="m">
          <Text variant="title2" fontSize={18}>
            Select Balance
          </Text>
        </Box>
        <Box paddingHorizontal="xl" paddingTop="m">
          <Box flexDirection="row" alignItems="center" marginBottom="s">
            <Nigeria width={20} height={20} />
            <Text variant="body" marginLeft="l" fontWeight="400">
              NGN Balance
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Usa width={20} height={20} />
            <Text variant="body" marginLeft="l" fontWeight="400">
              USD Balance
            </Text>
          </Box>
        </Box>
      </Animated.View>
    </Box>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D336E',
    justifyContent: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
  },
  tab: {
    width: SEGMENT,
    height: ICON_SIZE + PADDING * 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
