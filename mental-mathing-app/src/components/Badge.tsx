import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { Difficulty } from '../types';
import { spacing, borderRadius, fontSize, fontWeight } from '../constants/theme';

interface BadgeProps {
  difficulty: Difficulty;
}

export const Badge: React.FC<BadgeProps> = ({ difficulty }) => {
  const { theme } = useTheme();

  const getBadgeColor = (): string => {
    switch (difficulty) {
      case 'Easy':
        return theme.success;
      case 'Medium':
        return theme.warning;
      case 'Hard':
        return theme.error;
      default:
        return theme.primary;
    }
  };

  const badgeStyle: ViewStyle = {
    backgroundColor: getBadgeColor() + '20', // 20% opacity
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  };

  const textStyle: TextStyle = {
    color: getBadgeColor(),
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  };

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{difficulty}</Text>
    </View>
  );
};
