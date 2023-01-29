import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, Input, Stack, FormControl } from 'native-base';
import { register } from '../../store/actions/authActions'
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

function Signup({ navigation }) {
  // For Navigation
  const { navigate } = navigation;

  // Call useDispatch from react redux
  const dispatch = useDispatch();

  // Get Input values and Define Variables
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('sam@gmail.com');
  const [phone, setPhone] = useState('123456789');
  const [userRef, setUserRef] = useState('');

  // When User click on register perform this function
  const onSubmit = () => {

    // If user does not supply email or phone number, alert error
    if (!email || !phone) return alert('Please set all feilds');

    // Get value to array data
    const newUser = { name, email, phone, userRef };

    navigate('Password', {
      data: newUser,
      type: 'REGISTER',
    });

    // Then call register function and pass the "newUser" array as function property and dispatch, this function is inside redux store file named authActions.js
    // dispatch(register(newUser));

  };

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="white">
        <Box paddingHorizontal="m" paddingVertical="m">
          <Box marginTop="m">
            <FormControl>
              <Stack style={{ ...styles.itemStyle }}>
                <Input
                  size="md"
                  placeholder="Full Name"
                  variant="rounded"
                  defaultValue={name}
                  onChangeText={(name) => setName(name)}
                />
              </Stack>
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
                <Input
                  size="md"
                  placeholder="Phone Number"
                  variant="rounded"
                  keyboardType="number-pad"
                  onChangeText={(phone) => setPhone(phone)}
                  defaultValue={phone}
                  onSubmitEditing={onSubmit}
                />
              </Stack>
              <Stack style={{ ...styles.itemStyle }}>
                <Input
                  size="md"
                  placeholder="Refferal Code(Optional)"
                  variant="rounded"
                  onChangeText={(userRef) => setUserRef(userRef)}
                  defaultValue={userRef}
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

export default Signup;
