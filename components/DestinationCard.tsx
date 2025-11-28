import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface DestinationCardProps {
  name: string;
  state: string;
  region: string;
  visited: boolean;
  onToggleVisited: () => void;
  onPress?: () => void;
  altitude?: string;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function DestinationCard({
  name,
  state,
  region,
  visited,
  onToggleVisited,
  onPress,
  altitude,
}: DestinationCardProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <ThemedText type="body" style={styles.name}>
            {name}
          </ThemedText>
          <Feather name="chevron-right" size={16} color={theme.textSecondary} />
        </View>
        <View style={styles.infoRow}>
          <ThemedText
            type="small"
            style={[styles.info, { color: theme.textSecondary }]}
          >
            {state}
          </ThemedText>
          <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
          <ThemedText
            type="small"
            style={[styles.info, { color: theme.textSecondary }]}
          >
            {region}
          </ThemedText>
          {altitude ? (
            <>
              <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
              <ThemedText
                type="small"
                style={[styles.info, { color: theme.secondary }]}
              >
                {altitude}
              </ThemedText>
            </>
          ) : null}
        </View>
      </View>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onToggleVisited();
        }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View
          pointerEvents="none"
          style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, alignItems: "center", justifyContent: "center", backgroundColor: visited ? theme.success : "transparent", borderColor: visited ? theme.success : theme.border }}
        >
          {visited ? <Feather name="check" size={16} color="#FFFFFF" /> : null}
        </View>
      </Pressable>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  content: {
    flex: 1,
    marginRight: Spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xs,
  },
  name: {
    fontWeight: "600",
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  info: {
    fontSize: 13,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
});
