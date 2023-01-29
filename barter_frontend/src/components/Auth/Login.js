import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, Input, Stack, FormControl } from 'native-base';
import { login } from '../../store/actions/authActions'
import { useDispatch } from 'react-redux';
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

function Login({ navigation }) {
  // For Navigation
  const { navigate } = navigation;

  // Get Input values and Define Variables
  const [email, setEmail] = useState('sam@gmail.com');

  // On click submit
  const onLogin = () => {

    // Navigate to the password page, and pass email and type as data
    navigate('Password', {
      data: {
        email,
      },
      type: 'LOGIN',
    });
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="white">
        <Box paddingHorizontal="m" paddingVertical="m">
          <Text variant="title1" fontSize={14} color="black">
            Whethere you're creating an account or signing back in let's start
            with your email & password
          </Text>
          <Box marginTop="m">
            <FormControl>
              <Stack style={{ ...styles.itemStyle }}>
                <Input
                  size="md"
                  placeholder="Email Address"
                  variant="rounded"
                  keyboardType="email-address"
                  defaultValue={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </Stack>
              <Stack style={{ ...styles.itemStyle }}>
                <TouchableOpacity onPress={onLogin}>
                  <Box
                    backgroundColor="barter"
                    paddingVertical="s"
                    borderRadius="m"
                    marginBottom="s">
                    <Text textAlign="center" variant="title1" fontSize={18} fontWeight="700">
                      Continue
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

export default Login;
