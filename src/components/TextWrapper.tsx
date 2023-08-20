import {Text, TextProps} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {getFontSize} from '../utils';

interface TextWrapperProps extends TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
  fontFamily?: string;
  color?: string;
  bold?: boolean;
  style?: Array<TextProps['style']>;
  numberOfLines?: number;
}

const TextWrapper: React.FC<TextWrapperProps> = ({
  children,
  variant = 'h1',
  fontFamily,
  color = 'white',
  bold = false,
  style = {},
  ...otherProps
}) => {
  let fontSize = typeof variant === 'string' ? getFontSize(variant) : variant;
  const combinedStyles: Array<TextProps['style']> = Array.isArray(style)
    ? style
    : [style];
  return (
    <Text
      {...otherProps}
      style={[
        {
          fontSize,
          color,
          fontFamily,
          fontWeight: bold ? 'bold' : 'normal',
        },
        ...combinedStyles,
      ]}>
      {children}
    </Text>
  );
};

export default TextWrapper;

TextWrapper.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']),
};
