import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../theme';
import { ICON_SIZE } from '../../Constants';
import { BorderlessButton } from 'react-native-gesture-handler';

function Tab({ text, icon, index, onPress, routeName, children }) {
  return (
    <BorderlessButton
      onPress={() => {
        onPress(index, routeName);
      }}>
      <Box
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}>
        <Box
          style={{ ...StyleSheet.absoluteFill }}
          justifyContent="center"
          alignItems="center">
          {children}
        </Box>
      </Box>
    </BorderlessButton>
  );
}

export default Tab;
