import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { Card, Button } from '../components';
import { resetProgress } from '../utils/storage';
import { spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

export const SettingsScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isResetting, setIsResetting] = useState(false);

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            setIsResetting(true);
            await resetProgress();
            setIsResetting(false);
            Alert.alert('Success', 'Your progress has been reset.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Appearance
        </Text>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Toggle between light and dark theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        {/* About */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          About
        </Text>

        <Card style={styles.aboutCard}>
          <Text style={[styles.appName, { color: theme.text }]}>
            Mental Mathing
          </Text>
          <Text style={[styles.tagline, { color: theme.textSecondary }]}>
            Math is now mathing in your mind
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <Text style={[styles.description, { color: theme.text }]}>
            Master mental math with 14 powerful tricks that make calculations
            click naturally in your brain. Practice, track your progress, and
            watch the math math!
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              1.0.0
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Total Tricks
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              14
            </Text>
          </View>
        </Card>

        {/* Data */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Data
        </Text>

        <Card style={styles.settingCard}>
          <Text style={[styles.warningTitle, { color: theme.error }]}>
            Reset Progress
          </Text>
          <Text style={[styles.warningDescription, { color: theme.textSecondary }]}>
            This will permanently delete all your progress, stats, and practice
            history. This action cannot be undone.
          </Text>
          <Button
            title={isResetting ? 'Resetting...' : 'Reset All Progress'}
            onPress={handleResetProgress}
            variant="outline"
            disabled={isResetting}
            style={styles.resetButton}
          />
        </Card>

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
  settingCard: {
    marginBottom: spacing.xl,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: fontSize.sm,
  },
  aboutCard: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  appName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: fontSize.md,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: spacing.lg,
  },
  description: {
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.sm,
  },
  infoLabel: {
    fontSize: fontSize.sm,
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  warningTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  warningDescription: {
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  resetButton: {
    marginTop: spacing.sm,
  },
  footer: {
    height: spacing.xl,
  },
});
