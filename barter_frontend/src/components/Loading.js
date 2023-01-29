import React from 'react';
import {Box, Text} from '../components/theme';

const Loading = () => (
  <Box
    flex={1}
    backgroundColor="primary"
    position="absolute"
    bottom={0}
    right={0}
    left={0}
    top={0}
    justifyContent="center"
    alignItems="center">
    <Text variant="title1" fontSize={24}>
      Loading...
    </Text>
  </Box>
);
export default Loading;
