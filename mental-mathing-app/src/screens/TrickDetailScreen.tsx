import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { Card, Badge, Button } from '../components';
import { tricksMap } from '../constants/tricks';
import { spacing, fontSize, fontWeight } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type TrickDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'TrickDetail'>;
  route: RouteProp<RootStackParamList, 'TrickDetail'>;
};

export const TrickDetailScreen: React.FC<TrickDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme();
  const { trickId } = route.params;
  const trick = tricksMap[trickId];

  if (!trick) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Trick not found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {trick.name}
          </Text>
          <Badge difficulty={trick.difficulty} />
        </View>

        {/* Description */}
        <Card style={styles.descriptionCard}>
          <Text style={[styles.description, { color: theme.text }]}>
            {trick.explanation}
          </Text>
        </Card>

        {/* Formula Preview */}
        <Card style={styles.formulaCard}>
          <Text style={[styles.formulaLabel, { color: theme.textSecondary }]}>
            Formula
          </Text>
          <Text style={[styles.formula, { color: theme.primary }]}>
            {trick.formula}
          </Text>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Learn This Trick"
            onPress={() => navigation.navigate('Learn', { trickId: trick.id })}
            size="large"
            style={styles.button}
          />

          <Button
            title="Start Practicing"
            onPress={() => navigation.navigate('Practice', { trickId: trick.id })}
            variant="secondary"
            size="large"
            style={styles.button}
          />
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  descriptionCard: {
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  formulaCard: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  formulaLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  formula: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  actions: {
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
  footer: {
    height: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
