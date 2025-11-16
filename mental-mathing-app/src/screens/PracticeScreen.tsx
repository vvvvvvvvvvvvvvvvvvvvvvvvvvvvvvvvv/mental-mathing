import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../utils/ThemeContext';
import { Card, Button, Input } from '../components';
import { tricksMap } from '../constants/tricks';
import { Problem } from '../types';
import { updateProgress } from '../utils/storage';
import { spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type PracticeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Practice'>;
  route: RouteProp<RootStackParamList, 'Practice'>;
};

const ENCOURAGEMENT_MESSAGES = {
  correct: [
    'The math is mathing! 🧠',
    'Now we\'re mathing! ✨',
    'Math mathed perfectly! 💯',
    'Keep mathing! 🔥',
    'Brilliant mathing! 🌟',
  ],
  incorrect: [
    'Not quite mathing yet... 🤔',
    'The math needs more mathing!',
    'Let\'s math this again!',
    'Almost mathing!',
  ],
};

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme();
  const { trickId } = route.params;
  const trick = tricksMap[trickId];

  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (trick) {
      generateNewProblem();
    }
  }, [trick]);

  const generateNewProblem = () => {
    if (!trick) return;

    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const newProblem = trick.generateProblem();
      setProblem(newProblem);
      setUserAnswer('');
      setShowSolution(false);
      setIsCorrect(null);

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmit = async () => {
    if (!problem || !trick || userAnswer.trim() === '') return;

    const correct = trick.validateAnswer(problem, userAnswer);
    setIsCorrect(correct);
    setShowSolution(true);
    setTotalAttempts(totalAttempts + 1);

    // Haptic feedback
    if (correct) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setStreak(0);
    }

    // Update progress
    await updateProgress(trickId, correct);
  };

  const getRandomMessage = (type: 'correct' | 'incorrect'): string => {
    const messages = ENCOURAGEMENT_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!trick || !problem) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Loading...
        </Text>
      </View>
    );
  }

  const solution = showSolution ? trick.getSolution(problem) : null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0}%
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Accuracy
          </Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statValue, { color: theme.secondary }]}>
            {streak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Streak
          </Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statValue, { color: theme.success }]}>
            {score}/{totalAttempts}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Score
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Problem */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Card style={styles.problemCard}>
            <Text style={[styles.trickName, { color: theme.textSecondary }]}>
              {trick.name}
            </Text>
            <Text style={[styles.problemText, { color: theme.text }]}>
              {problem.question}
            </Text>

            {!showSolution && (
              <View style={styles.inputContainer}>
                <Input
                  value={userAnswer}
                  onChangeText={setUserAnswer}
                  placeholder="Your answer"
                  keyboardType="decimal-pad"
                  autoFocus
                  style={styles.input}
                />
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={userAnswer.trim() === ''}
                  style={styles.submitButton}
                />
              </View>
            )}
          </Card>

          {/* Feedback */}
          {showSolution && isCorrect !== null && (
            <Card
              style={[
                styles.feedbackCard,
                {
                  backgroundColor: isCorrect
                    ? theme.success + '20'
                    : theme.error + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.feedbackText,
                  { color: isCorrect ? theme.success : theme.error },
                ]}
              >
                {isCorrect
                  ? getRandomMessage('correct')
                  : getRandomMessage('incorrect')}
              </Text>
            </Card>
          )}

          {/* Solution */}
          {showSolution && solution && (
            <Card style={styles.solutionCard}>
              <Text style={[styles.solutionTitle, { color: theme.primary }]}>
                Solution
              </Text>

              {solution.steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: theme.primary + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.stepNumberText, { color: theme.primary }]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={[styles.stepText, { color: theme.text }]}>
                    {step}
                  </Text>
                </View>
              ))}

              <View
                style={[
                  styles.answerBox,
                  { backgroundColor: theme.success + '20' },
                ]}
              >
                <Text style={[styles.answerLabel, { color: theme.success }]}>
                  Answer:
                </Text>
                <Text style={[styles.answerText, { color: theme.success }]}>
                  {solution.answer}
                </Text>
              </View>

              <Button
                title="Next Problem"
                onPress={generateNewProblem}
                size="large"
                style={styles.nextButton}
              />
            </Card>
          )}
        </Animated.View>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  statLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  problemCard: {
    marginBottom: spacing.md,
  },
  trickName: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  problemText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    gap: spacing.md,
  },
  input: {
    fontSize: fontSize.xxl,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  feedbackCard: {
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  solutionCard: {
    marginBottom: spacing.md,
  },
  solutionTitle: {
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  answerLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  answerText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  nextButton: {
    marginTop: spacing.sm,
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
