import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { Card, Badge } from '../components';
import { mentalMathTricks } from '../constants/tricks';
import { spacing, fontSize, fontWeight } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme === theme ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Mental Mathing
        </Text>
        <Text style={[styles.tagline, { color: theme.textSecondary }]}>
          Math is now mathing in your mind
        </Text>
      </View>

      {/* Tricks List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Browse All Tricks
        </Text>

        {mentalMathTricks.map((trick) => (
          <Card
            key={trick.id}
            style={styles.trickCard}
            onPress={() => navigation.navigate('TrickDetail', { trickId: trick.id })}
          >
            <View style={styles.trickHeader}>
              <View style={styles.trickTitleContainer}>
                <Text style={[styles.trickName, { color: theme.text }]}>
                  {trick.name}
                </Text>
                <Badge difficulty={trick.difficulty} />
              </View>
            </View>

            <Text style={[styles.trickDescription, { color: theme.textSecondary }]}>
              {trick.shortDescription}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.primary + '20' }]}
                onPress={() => navigation.navigate('Learn', { trickId: trick.id })}
              >
                <Text style={[styles.actionButtonText, { color: theme.primary }]}>
                  Learn
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.secondary + '20' }]}
                onPress={() => navigation.navigate('Practice', { trickId: trick.id })}
              >
                <Text style={[styles.actionButtonText, { color: theme.secondary }]}>
                  Practice
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: fontSize.md,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  trickCard: {
    marginBottom: spacing.md,
  },
  trickHeader: {
    marginBottom: spacing.sm,
  },
  trickTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  trickName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    flex: 1,
    marginRight: spacing.sm,
  },
  trickDescription: {
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  footer: {
    height: spacing.xl,
  },
});
