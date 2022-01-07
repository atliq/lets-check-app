import React from 'react';
import {Text} from 'react-native';

const CustomText = props => {
  const {style, children} = props;

  return (
    <Text {...props} style={[{color: 'black'}, style && style]}>
      {children}
    </Text>
  );
};

export {CustomText};
