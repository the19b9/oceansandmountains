import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { AvatarSelector } from "@/components/AvatarSelector";
import { StatCard } from "@/components/StatCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { BEACHES, MOUNTAINS } from "@/data/destinations";
import {
  getVisitedBeaches,
  getVisitedMountains,
  getUserProfile,
  saveUserProfile,
  clearAllData,
  UserProfile,
} from "@/utils/storage";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Traveler",
    avatarIndex: 0,
  });
  const [visitedBeachesCount, setVisitedBeachesCount] = useState(0);
  const [visitedMountainsCount, setVisitedMountainsCount] = useState(0);
  const [nameInput, setNameInput] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [userProfile, visitedBeaches, visitedMountains] = await Promise.all([
      getUserProfile(),
      getVisitedBeaches(),
      getVisitedMountains(),
    ]);
    setProfile(userProfile);
    setNameInput(userProfile.name);
    setVisitedBeachesCount(visitedBeaches.size);
    setVisitedMountainsCount(visitedMountains.size);
  };

  const handleAvatarSelect = async (index: number) => {
    const newProfile = { ...profile, avatarIndex: index };
    setProfile(newProfile);
    await saveUserProfile(newProfile);
  };

  const handleNameSave = async () => {
    if (nameInput.trim()) {
      const newProfile = { ...profile, name: nameInput.trim() };
      setProfile(newProfile);
      await saveUserProfile(newProfile);
    }
  };

  const handleClearProgress = () => {
    Alert.alert(
      "Clear All Progress",
      "This will reset all your visited beaches and mountains. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearAllData();
            setVisitedBeachesCount(0);
            setVisitedMountainsCount(0);
          },
        },
      ]
    );
  };

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Choose Your Avatar
        </ThemedText>
        <AvatarSelector
          selectedIndex={profile.avatarIndex}
          onSelect={handleAvatarSelect}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Your Name
        </ThemedText>
        <View style={styles.nameInputRow}>
          <TextInput
            style={[
              styles.nameInput,
              {
                backgroundColor: theme.backgroundDefault,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={nameInput}
            onChangeText={setNameInput}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            onBlur={handleNameSave}
            returnKeyType="done"
            onSubmitEditing={handleNameSave}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Travel Progress
        </ThemedText>
        <StatCard
          title="Beaches Visited"
          visited={visitedBeachesCount}
          total={BEACHES.length}
          icon="sun"
          color={theme.primary}
        />
        <StatCard
          title="Mountains Conquered"
          visited={visitedMountainsCount}
          total={MOUNTAINS.length}
          icon="triangle"
          color={theme.secondary}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Settings
        </ThemedText>
        <Pressable
          onPress={handleClearProgress}
          style={({ pressed }) => [
            styles.dangerButton,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: "#EF4444",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText type="body" style={styles.dangerButtonText}>
            Clear All Progress
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <ThemedText
          type="small"
          style={[styles.footerText, { color: theme.textSecondary }]}
        >
          India Explorer v1.0
        </ThemedText>
        <ThemedText
          type="small"
          style={[styles.footerText, { color: theme.textSecondary }]}
        >
          Track your adventures across India
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  nameInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameInput: {
    flex: 1,
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
  },
  dangerButton: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerButtonText: {
    color: "#EF4444",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingTop: Spacing["2xl"],
    paddingBottom: Spacing.xl,
  },
  footerText: {
    marginBottom: Spacing.xs,
  },
});
