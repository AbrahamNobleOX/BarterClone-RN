import React, { useState } from 'react';
import { TextInput } from 'react-native';
import theme, { Box, Text } from '../theme';
import { NativeBaseProvider, Button } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { send } from '../../store/actions/transactionAction';
import { useDispatch } from 'react-redux';

function SendMoney({ navigation, route }) {
  const dispatch = useDispatch();
  const { amount } = route.params;
  const [purpose, setPurpose] = useState('');
  const [account, setAccount] = useState('');

  const onSend = () => {
    const data = {
      amount: +amount,
      purpose,
      account: +account,
    };

    dispatch(send(data));

    // Redirect to dashboard after sending the money
    navigation.dispatch(StackActions.replace('Dashboard'));
  };

  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        backgroundColor="white"
        paddingHorizontal="m"
        paddingVertical="l">
        <Text variant="title2" marginBottom="l">
          Recipient's details
        </Text>

        <Box borderBottomWidth={1} paddingVertical="m" marginBottom="m">
          <Text variant="title2" fontSize={15}>
            BOLT SKILLS BANK PLC
          </Text>
        </Box>

        <Box borderBottomWidth={1} paddingVertical="m" marginBottom="m">
          <TextInput
            placeholder="Account Number"
            style={{
              width: '100%',
              fontSize: 15,
              paddingVertical: 0,
            }}
            keyboardType="number-pad"
            placeholderTextColor="#000"
            defaultValue={account}
            onChangeText={(text) => setAccount(text)}
          />
        </Box>

        <Box borderBottomWidth={1} paddingVertical="m" marginBottom="m">
          <TextInput
            placeholder="Purpose"
            style={{
              width: '100%',
              fontSize: 15,
              paddingVertical: 0,
            }}
            placeholderTextColor="#000"
            defaultValue={purpose}
            onChangeText={(text) => setPurpose(text)}
          />
        </Box>

        <Box marginTop="m">
          <Button
            style={{
              width: '100%',
              backgroundColor: theme.colors.barter,
              textAlign: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              paddingVertical: 12,
            }}
            onPress={onSend}>
            <Text variant="title1" fontSize={23} fontWeight="bold">
              Continue
            </Text>
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default SendMoney;
