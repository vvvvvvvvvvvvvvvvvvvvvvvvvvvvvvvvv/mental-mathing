import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, borderRadius, fontSize } from '../constants/theme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  autoFocus?: boolean;
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  autoFocus = false,
  style,
}) => {
  const { theme } = useTheme();

  const inputStyle: TextStyle = {
    backgroundColor: theme.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.lg,
    color: theme.text,
    borderWidth: 2,
    borderColor: theme.border,
  };

  return (
    <TextInput
      style={[inputStyle, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.textSecondary}
      keyboardType={keyboardType}
      autoFocus={autoFocus}
    />
  );
};
