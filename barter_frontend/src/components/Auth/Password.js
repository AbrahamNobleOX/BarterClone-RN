import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, Input, Stack, FormControl } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { register, login } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: 20,
  },
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.barter,
    borderRadius: 5,
  },
});

function Password({ navigation, route }) {
  // For Navigation
  const { navigate } = navigation;

  // Call useDispatch from react redux
  const dispatch = useDispatch();

  // Get Input values and Define Variables
  const [password, setPassword] = useState('1111');

  // Get route parameter passed during navigation, in Signup.js and Login.js
  const { data, type } = route.params;

  // Get Authentication status from index.js in the reducer folder ".auth"
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Get msg from index.js in the reducer folder ".err"
  const { msg } = useSelector((state) => state.err);

  // On click submit
  const onSubmit = () => {
    if (type === 'REGISTER') {
      // Get data value passed during navigation, in Signup.js
      const { name, email, phone, userRef } = data;
      // Store value as array inside "newUser"
      const newUser = {
        name,
        email,
        phone,
        password,
        userRef,
      };

      // Then call register function and pass the "newUser" array as function property and dispatch, this function is inside redux store file named authActions.js
      dispatch(register(newUser));

    } else if (type === 'LOGIN') {
      // Get data value passed during navigation, in Login.js
      const { email } = data;
      // Then call login function and pass the "email" array as function property and dispatch, this function is inside redux store file named authActions.js
      dispatch(login({ email, password }));

    }
  };

  // Check if Authentication status is true or false, if true, take user to dashboard, if false do nothing
  useEffect(() => {
    if (isAuthenticated) {
      navigation.dispatch(StackActions.replace('Dashboard'));
    }
  }, [isAuthenticated]);

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="white">
        <Box paddingHorizontal="m" paddingVertical="m">
          <Box marginTop="m">
            <Box>
              {msg ? (
                <Text variant="body" color="danger" textAlign="center">
                  {msg}
                </Text>
              ) : null}
            </Box>
            <FormControl>
              <Stack style={{ ...styles.itemStyle }}>
                <Input
                  size="md"
                  placeholder="Password"
                  variant="rounded"
                  onChangeText={(password) => setPassword(password)}
                  defaultValue={password}
                  onSubmitEditing={onSubmit}
                />
              </Stack>
              <Stack style={{ ...styles.itemStyle }}>
                <TouchableOpacity onPress={onSubmit}>
                  <Box
                    backgroundColor="barter"
                    paddingVertical="s"
                    borderRadius="m"
                    marginBottom="s">
                    <Text textAlign="center" variant="title1" fontSize={18} fontWeight="700">
                      {type === 'LOGIN' ? 'LogIn' : 'Register'}
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Stack>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default Password;
