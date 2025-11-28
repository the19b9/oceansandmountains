import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

const AVATARS = [
  require("../assets/images/avatars/backpacker.png"),
  require("../assets/images/avatars/climber.png"),
  require("../assets/images/avatars/beach.png"),
];

interface AvatarSelectorProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function AvatarSelector({ selectedIndex, onSelect }: AvatarSelectorProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {AVATARS.map((avatar, index) => (
        <Pressable
          key={index}
          onPress={() => onSelect(index)}
          style={({ pressed }) => [
            styles.avatarContainer,
            {
              borderColor:
                selectedIndex === index ? theme.primary : theme.border,
              borderWidth: selectedIndex === index ? 3 : 1,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Image source={avatar} style={styles.avatar} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
