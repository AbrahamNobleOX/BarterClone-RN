import React from 'react';
import { Dimensions } from 'react-native';
import { Box, Text } from '../../theme';

const { width } = Dimensions.get('window');

function Slide({ title, body }) {
  return (
    <Box {...{ width }} justifyContent="center" alignItems="center" marginTop="l">
      <Box height={300} width={200} borderWidth={1} marginBottom="m"></Box>
      <Box justifyContent="center" alignItems="center" paddingHorizontal="l">
        <Text
          textAlign="center"
          variant="hero"
          fontSize={18}
          color="black"
          lineHeight={20}
          marginBottom="s">
          {title}
        </Text>
        <Text
          textAlign="center"
          variant="body"
          fontSize={14}
          lineHeight={15}
          color="black"
          fontWeight="400">
          {body}
        </Text>
      </Box>
    </Box>
  );
}

export default Slide;
