import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface StatCardProps {
  title: string;
  visited: number;
  total: number;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

export function StatCard({ title, visited, total, icon, color }: StatCardProps) {
  const { theme } = useTheme();
  const percentage = total > 0 ? Math.round((visited / total) * 100) : 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Feather name={icon} size={20} color={color} />
        </View>
        <ThemedText type="body" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.statsRow}>
        <ThemedText type="h3" style={[styles.visitedCount, { color }]}>
          {visited}
        </ThemedText>
        <ThemedText type="body" style={[styles.totalCount, { color: theme.textSecondary }]}>
          / {total}
        </ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { backgroundColor: color, width: `${percentage}%` },
            ]}
          />
        </View>
        <ThemedText
          type="small"
          style={[styles.percentage, { color: theme.textSecondary }]}
        >
          {percentage}%
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  title: {
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.md,
  },
  visitedCount: {
    fontWeight: "700",
  },
  totalCount: {
    marginLeft: Spacing.xs,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: Spacing.md,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentage: {
    width: 40,
    textAlign: "right",
  },
});
