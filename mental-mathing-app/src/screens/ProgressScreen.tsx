import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { Card, Badge } from '../components';
import { getProgress } from '../utils/storage';
import { UserProgress } from '../types';
import { mentalMathTricks } from '../constants/tricks';
import { spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { useFocusEffect } from '@react-navigation/native';

export const ProgressScreen: React.FC = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  const loadProgress = async () => {
    const data = await getProgress();
    setProgress(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [])
  );

  if (!progress) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading progress...
        </Text>
      </View>
    );
  }

  const accuracyPercent =
    progress.totalProblems > 0
      ? Math.round((progress.totalCorrect / progress.totalProblems) * 100)
      : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Stats */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Overall Progress
        </Text>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {progress.totalProblems}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Total Problems
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.success }]}>
              {accuracyPercent}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Accuracy
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.secondary }]}>
              {progress.currentStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Current Streak
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.warning }]}>
              {progress.bestStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Best Streak
            </Text>
          </Card>
        </View>

        {/* Trick Stats */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Trick Progress
        </Text>

        {mentalMathTricks.map((trick) => {
          const trickStats = progress.trickStats[trick.id];
          const attempts = trickStats?.attempts || 0;
          const correct = trickStats?.correct || 0;
          const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
          const lastPracticed = trickStats?.lastPracticed;

          const getLastPracticedText = (): string => {
            if (!lastPracticed) return 'Never practiced';

            const now = Date.now();
            const diff = now - lastPracticed;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            return `${days}d ago`;
          };

          return (
            <Card key={trick.id} style={styles.trickCard}>
              <View style={styles.trickHeader}>
                <Text style={[styles.trickName, { color: theme.text }]}>
                  {trick.name}
                </Text>
                <Badge difficulty={trick.difficulty} />
              </View>

              {attempts > 0 ? (
                <>
                  <View style={styles.trickStatsRow}>
                    <View style={styles.trickStat}>
                      <Text style={[styles.trickStatValue, { color: theme.primary }]}>
                        {attempts}
                      </Text>
                      <Text style={[styles.trickStatLabel, { color: theme.textSecondary }]}>
                        Attempts
                      </Text>
                    </View>

                    <View style={styles.trickStat}>
                      <Text
                        style={[
                          styles.trickStatValue,
                          {
                            color:
                              accuracy >= 80
                                ? theme.success
                                : accuracy >= 60
                                ? theme.warning
                                : theme.error,
                          },
                        ]}
                      >
                        {accuracy}%
                      </Text>
                      <Text style={[styles.trickStatLabel, { color: theme.textSecondary }]}>
                        Accuracy
                      </Text>
                    </View>

                    <View style={styles.trickStat}>
                      <Text style={[styles.trickStatValue, { color: theme.success }]}>
                        {correct}
                      </Text>
                      <Text style={[styles.trickStatLabel, { color: theme.textSecondary }]}>
                        Correct
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.lastPracticed, { color: theme.textSecondary }]}>
                    Last practiced: {getLastPracticedText()}
                  </Text>
                </>
              ) : (
                <Text style={[styles.noPractice, { color: theme.textSecondary }]}>
                  Not practiced yet
                </Text>
              )}
            </Card>
          );
        })}

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
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  statLabel: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  trickCard: {
    marginBottom: spacing.md,
  },
  trickHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  trickName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    flex: 1,
    marginRight: spacing.sm,
  },
  trickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  trickStat: {
    alignItems: 'center',
  },
  trickStatValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  trickStatLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  lastPracticed: {
    fontSize: fontSize.xs,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  noPractice: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    height: spacing.xl,
  },
  loadingText: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
