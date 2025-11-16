import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, TrickStats } from '../types';

const STORAGE_KEYS = {
  PROGRESS: '@mental_mathing_progress',
  THEME: '@mental_mathing_theme',
};

const defaultProgress: UserProgress = {
  totalProblems: 0,
  totalCorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  trickStats: {},
  sessions: [],
};

export const getProgress = async (): Promise<UserProgress> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : defaultProgress;
  } catch (error) {
    console.error('Error loading progress:', error);
    return defaultProgress;
  }
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const updateProgress = async (
  trickId: string,
  correct: boolean
): Promise<UserProgress> => {
  const progress = await getProgress();

  // Update totals
  progress.totalProblems += 1;
  if (correct) {
    progress.totalCorrect += 1;
    progress.currentStreak += 1;
    if (progress.currentStreak > progress.bestStreak) {
      progress.bestStreak = progress.currentStreak;
    }
  } else {
    progress.currentStreak = 0;
  }

  // Update trick stats
  if (!progress.trickStats[trickId]) {
    progress.trickStats[trickId] = {
      attempts: 0,
      correct: 0,
      lastPracticed: null,
    };
  }

  const trickStats = progress.trickStats[trickId];
  trickStats.attempts += 1;
  if (correct) {
    trickStats.correct += 1;
  }
  trickStats.lastPracticed = Date.now();

  // Add session
  progress.sessions.push({
    trickId,
    correct,
    timestamp: Date.now(),
  });

  // Keep only last 100 sessions
  if (progress.sessions.length > 100) {
    progress.sessions = progress.sessions.slice(-100);
  }

  await saveProgress(progress);
  return progress;
};

export const getTheme = async (): Promise<'light' | 'dark'> => {
  try {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    return (theme as 'light' | 'dark') || 'light';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'light';
  }
};

export const saveTheme = async (theme: 'light' | 'dark'): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const resetProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(defaultProgress));
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};
