import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#34C759', text: '#FFFFFF' },
  warning: { bg: '#FF9500', text: '#FFFFFF' },
  danger: { bg: '#FF3B30', text: '#FFFFFF' },
  info: { bg: '#007AFF', text: '#FFFFFF' },
  neutral: { bg: '#8E8E93', text: '#FFFFFF' },
};

export function Badge({ text, variant = 'neutral', style }: BadgeProps) {
  const colors = COLORS[variant];

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, style]}>
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </View>
  );
}

/**
 * Helper to get badge variant from connection status
 */
export function getStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'neutral';
    case 'Suspended':
      return 'danger';
    default:
      return 'neutral';
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Badge;
