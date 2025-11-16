import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, borderRadius, fontSize, fontWeight } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    // Size
    if (size === 'small') {
      base.paddingVertical = spacing.sm;
      base.paddingHorizontal = spacing.md;
    } else if (size === 'large') {
      base.paddingVertical = spacing.lg;
      base.paddingHorizontal = spacing.xl;
    } else {
      base.paddingVertical = spacing.md;
      base.paddingHorizontal = spacing.lg;
    }

    // Variant
    if (variant === 'primary') {
      base.backgroundColor = theme.primary;
    } else if (variant === 'secondary') {
      base.backgroundColor = theme.secondary;
    } else {
      base.backgroundColor = 'transparent';
      base.borderWidth = 2;
      base.borderColor = theme.primary;
    }

    return base;
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontWeight: fontWeight.semibold,
    };

    // Size
    if (size === 'small') {
      base.fontSize = fontSize.sm;
    } else if (size === 'large') {
      base.fontSize = fontSize.lg;
    } else {
      base.fontSize = fontSize.md;
    }

    // Variant
    if (variant === 'outline') {
      base.color = theme.primary;
    } else {
      base.color = '#FFFFFF';
    }

    return base;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
