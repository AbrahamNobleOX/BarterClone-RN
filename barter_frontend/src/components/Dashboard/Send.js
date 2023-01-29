import React, { useState } from 'react';
import theme, { Box, Text } from '../theme';
import { Nigeria } from '../../Icons';
import { TextInput } from 'react-native-gesture-handler';
import { NativeBaseProvider, Input, Button } from 'native-base';

function Send({ navigation }) {
  const { navigate } = navigation;
  const [amount, setAmount] = useState('');

  const onSend = () => {
    if (amount < 100) {
      alert('Amount is less than 100');
    } else {
      navigate('SendMoney', { amount });
    }
  };

  return (
    <NativeBaseProvider>
      <Box padding="m" backgroundColor="white" flex={1}>
        <Box
          backgroundColor="primaryLight"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical="l">
          <Box>
            <Text variant="title1" fontSize={16} color="black" marginBottom="s" fontWeight="bold">
              Amount to send
            </Text>
            <TextInput
              placeholder="0.00"
              style={{
                height: 50,
                width: '100%',
                padding: 7,
                fontWeight: 'bold',
                fontSize: 23,
              }}
              keyboardType="number-pad"
              placeholderTextColor="#000"
              defaultValue={amount}
              onChangeText={(amount) => setAmount(amount)}
            />
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            borderLeftWidth={1}
            paddingLeft="m">
            <Nigeria height={20} width={20} />
            <Text marginLeft="s" variant="body" fontSize={13}>
              NGN
            </Text>
          </Box>
        </Box>

        <Box marginTop="l">
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

export default Send;
