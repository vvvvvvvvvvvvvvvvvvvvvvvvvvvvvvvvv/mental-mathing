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
import { spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type LearnScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Learn'>;
  route: RouteProp<RootStackParamList, 'Learn'>;
};

export const LearnScreen: React.FC<LearnScreenProps> = ({ navigation, route }) => {
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

        {/* Explanation */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            How It Works
          </Text>
          <Text style={[styles.explanation, { color: theme.text }]}>
            {trick.explanation}
          </Text>
        </Card>

        {/* Formula */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Formula
          </Text>
          <View style={[styles.formulaBox, { backgroundColor: theme.surfaceLight }]}>
            <Text style={[styles.formula, { color: theme.text }]}>
              {trick.formula}
            </Text>
          </View>
        </Card>

        {/* Examples */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Worked Examples
          </Text>

          {trick.examples.map((example, index) => (
            <View key={index} style={styles.example}>
              <Text style={[styles.problemText, { color: theme.text }]}>
                {example.problem}
              </Text>

              {example.steps.map((step, stepIndex) => (
                <View key={stepIndex} style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: theme.primary + '20' },
                    ]}
                  >
                    <Text style={[styles.stepNumberText, { color: theme.primary }]}>
                      {stepIndex + 1}
                    </Text>
                  </View>
                  <Text style={[styles.stepText, { color: theme.textSecondary }]}>
                    {step}
                  </Text>
                </View>
              ))}

              <View style={[styles.answerBox, { backgroundColor: theme.success + '20' }]}>
                <Text style={[styles.answerLabel, { color: theme.success }]}>
                  Answer:
                </Text>
                <Text style={[styles.answerText, { color: theme.success }]}>
                  {example.answer}
                </Text>
              </View>

              {index < trick.examples.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.border }]} />
              )}
            </View>
          ))}
        </Card>

        {/* Practice Button */}
        <Button
          title="Start Practicing!"
          onPress={() => navigation.navigate('Practice', { trickId: trick.id })}
          size="large"
          style={styles.practiceButton}
        />

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
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  explanation: {
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  formulaBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  formula: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  example: {
    marginBottom: spacing.md,
  },
  problemText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  stepNumberText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  answerBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  answerLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  answerText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  practiceButton: {
    marginVertical: spacing.md,
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
